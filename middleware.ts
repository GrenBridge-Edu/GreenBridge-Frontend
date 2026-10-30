/**
 * Vercel Routing Middleware — runs on Vercel's Edge runtime, ahead of the SPA rewrite in
 * vercel.json (Middleware always runs before rewrites), for any request whose path matches
 * `config.matcher` below. Framework-agnostic: plain Web `Request`/`Response`, no `next/server`
 * import, no new dependency.
 *
 * Handles three things a client-only React SPA can't do for itself:
 *
 * 1. `/products/:slug` — fetches the product from the backend and serves the SAME index.html
 *    shell with its <title>, meta description, canonical link, Open Graph / Twitter tags and
 *    JSON-LD swapped in for that product. Link-preview crawlers (WhatsApp, X, Facebook, Slack —
 *    none of which run JavaScript) see accurate tags on the very first response instead of the
 *    generic fallback. Real browsers get the same corrected shell, then the SPA boots normally;
 *    `useSEOMeta`'s client-side override (see src/screens/products/[slug]/index.tsx) re-applies
 *    the same tags once React mounts, so the two never disagree.
 * 2. `/sitemap.xml` — static marketing routes plus every product slug, built from the backend's
 *    `GET /v1/products/sitemap` (added in the backend's M3 milestone).
 * 3. `/robots.txt` — allows crawling, disallows the transactional pages, points at the sitemap.
 *
 * On any failure (backend unreachable, product not found, timeout) every branch falls through
 * by returning nothing, so the request continues to the normal SPA rewrite / static file exactly
 * as if this file didn't exist — this can only make a response better, never break one.
 */

export const config = {
	matcher: ["/products/:slug*", "/sitemap.xml", "/robots.txt"],
};

// ─── Site variants ─────────────────────────────────────────────────────────
// Mirrors src/data/Config.ts's HOSTNAME_VARIANTS / SITE_CONFIGS — kept in sync by hand, the same
// way src/lib/pricing.ts mirrors the backend's pricing logic. Client-side config isn't reachable
// here: it reads import.meta.env and pulls in zustand/axios, none of which belong in an edge
// bundle. Only the handful of fields this file actually needs are duplicated.
interface SiteBranding {
	name: string;
	ogImage: string;
}

const SITE_BY_HOSTNAME: Record<string, SiteBranding> = {
	"shinsen.app": { name: "Shinsen", ogImage: "/logo-favicon.png" },
	"www.shinsen.app": { name: "Shinsen", ogImage: "/logo-favicon.png" },
	"jubilingoagro.com": { name: "Jubilingo Agro", ogImage: "/logo-favicon.png" },
	"www.jubilingoagro.com": { name: "Jubilingo Agro", ogImage: "/logo-favicon.png" },
};

const DEFAULT_SITE: SiteBranding = { name: "Jubilingo Agro", ogImage: "/logo-favicon.png" };

const siteFor = (hostname: string): SiteBranding => SITE_BY_HOSTNAME[hostname] ?? DEFAULT_SITE;

// ─── Static marketing routes ────────────────────────────────────────────────
// Indexable pages that aren't products. Cart, checkout, order-confirmation, track-order and
// newsletter-unsubscribe are deliberately excluded — see ROBOTS_DISALLOW below.
const STATIC_SITEMAP_PATHS = [
	"/",
	"/honey",
	"/chicks",
	"/frozen-food",
	"/blog",
	"/bulk-quote",
	"/contact",
	"/privacy-policy",
	"/terms",
	"/shipping-policy",
	"/refund-policy",
];

const ROBOTS_DISALLOW = [
	"/cart",
	"/checkout",
	"/order-confirmation",
	"/track-order",
	"/newsletter-unsubscribe",
];

// ─── Backend access ──────────────────────────────────────────────────────────
// The absolute origin of the backend API — must be set as a Vercel project env var (Production
// and Preview). Use the SAME value production's VITE_API_BASE_URL resolves to (an absolute URL;
// the "/api" in .env.example is a LOCAL dev-only proxy target — see vite.config.ts's server.proxy
// — and doesn't exist on Vercel's static hosting, so a relative path won't work from here).
const API_BASE_URL = process.env.SEO_API_BASE_URL;

const FETCH_TIMEOUT_MS = 3000;

const fetchJson = async <T,>(path: string): Promise<T | null> => {
	if (!API_BASE_URL) return null;
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
	try {
		const res = await fetch(`${API_BASE_URL}${path}`, { signal: controller.signal });
		if (!res.ok) return null;
		const body = (await res.json()) as { success: boolean; data: T };
		return body.data;
	} catch {
		return null;
	} finally {
		clearTimeout(timeout);
	}
};

// ─── HTML helpers ────────────────────────────────────────────────────────────
const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

const stripHtml = (html: string): string => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const truncate = (text: string, max: number): string =>
	text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

// ─── Backend product shape (only the fields this file reads) ───────────────
interface ProductVariant {
	price: number;
	imageUrl?: string;
	discount?: { type: "percentage" | "flat"; value: number };
}

interface Product {
	name: string;
	subCategory: string;
	brand?: string;
	description?: string;
	images: { url: string }[];
	variants: ProductVariant[];
	priceFrom?: number;
	priceTo?: number;
	inStock: boolean;
	seo?: { metaTitle?: string; metaDescription?: string };
}

interface SitemapEntry {
	slug: string;
	updatedAt: string;
	image?: string;
}

/** slug -> URL path prefix, one sitemap fetch each. Blog posts (added alongside product entries)
 *  use the same {slug, updatedAt, image} shape from the backend's GET /v1/blog/sitemap. */
const SITEMAP_SOURCES: { path: string; endpoint: string }[] = [
	{ path: "/products", endpoint: "/v1/products/sitemap" },
	{ path: "/blog", endpoint: "/v1/blog/sitemap" },
];

interface ProductTags {
	title: string;
	description: string;
}

/** Same title/description rule used for both the <title>/meta tag swap and the OG/Twitter block
 *  below — computed once so the two can't drift apart. */
const buildProductTags = (product: Product, site: SiteBranding): ProductTags => ({
	title: product.seo?.metaTitle || `${product.name} | ${site.name}`,
	description: truncate(
		product.seo?.metaDescription ||
			stripHtml(product.description ?? "") ||
			`${product.name} — ${product.subCategory}, delivered by ${site.name}.`,
		160,
	),
});

// ─── Product page: rewrite the SPA shell's <head> ───────────────────────────
const buildProductHead = (product: Product, tags: ProductTags, url: URL, site: SiteBranding): string => {
	const { title, description } = tags;
	const image = product.images[0]?.url
		? product.images[0].url
		: `${url.origin}${site.ogImage}`;
	const canonical = `${url.origin}${url.pathname}`;

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		description: stripHtml(product.description ?? "") || product.name,
		image: product.images.map(i => i.url),
		...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "NGN",
			lowPrice: product.priceFrom,
			highPrice: product.priceTo,
			offerCount: product.variants.length,
			availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
		},
	};

	// JSON-LD goes inside a script tag, never HTML-escaped (it's JSON, not markup) — but it must
	// not contain a literal "</script>" sequence, which would terminate the tag early.
	const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

	return [
		`<link rel="canonical" href="${escapeHtml(canonical)}" />`,
		`<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
		`<meta property="og:type" content="product" />`,
		`<meta property="og:title" content="${escapeHtml(title)}" />`,
		`<meta property="og:description" content="${escapeHtml(description)}" />`,
		`<meta property="og:image" content="${escapeHtml(image)}" />`,
		`<meta property="og:url" content="${escapeHtml(canonical)}" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${escapeHtml(title)}" />`,
		`<meta name="twitter:description" content="${escapeHtml(description)}" />`,
		`<meta name="twitter:image" content="${escapeHtml(image)}" />`,
		`<script type="application/ld+json">${jsonLdScript}</script>`,
	].join("\n\t\t");
};

const handleProductPage = async (request: Request, url: URL): Promise<Response | undefined> => {
	const slug = url.pathname.replace(/^\/products\//, "").replace(/\/$/, "");
	if (!slug) return undefined;

	const product = await fetchJson<Product>(`/v1/products/slug/${encodeURIComponent(slug)}`);
	if (!product) return undefined; // unknown slug — let the SPA show its own not-found handling

	const shellRes = await fetch(new URL("/index.html", url), { headers: request.headers });
	if (!shellRes.ok) return undefined;
	let html = await shellRes.text();

	const site = siteFor(url.hostname);
	const tags = buildProductTags(product, site);

	html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(tags.title)}</title>`);
	html = html.replace(
		/<meta name="description" content="[^"]*"\s*\/>/,
		`<meta name="description" content="${escapeHtml(tags.description)}" />`,
	);
	html = html.replace(
		"<!-- __SEO_HEAD__: replaced by middleware.ts with canonical/OG/Twitter/JSON-LD tags on product pages. Left empty for every other route. -->",
		buildProductHead(product, tags, url, site),
	);

	return new Response(html, {
		status: 200,
		headers: {
			"content-type": "text/html; charset=utf-8",
			// Edge-cached for 5 minutes, served stale for up to a day while revalidating in the
			// background — keeps crawler/first-load traffic off the backend without showing a
			// stale price or "in stock" state for long after a real change.
			"cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
		},
	});
};

// ─── sitemap.xml ─────────────────────────────────────────────────────────────
const xmlEscape = (value: string): string =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const sitemapEntryUrl = (origin: string, pathPrefix: string, entry: SitemapEntry): string => {
	const loc = `${origin}${pathPrefix}/${entry.slug}`;
	const image = entry.image
		? `\n\t\t<image:image><image:loc>${xmlEscape(entry.image)}</image:loc></image:image>`
		: "";
	return `\t<url>\n\t\t<loc>${xmlEscape(loc)}</loc>\n\t\t<lastmod>${new Date(entry.updatedAt).toISOString()}</lastmod>${image}\n\t</url>`;
};

const handleSitemap = async (url: URL): Promise<Response> => {
	const sources = await Promise.all(
		SITEMAP_SOURCES.map(async source => ({
			pathPrefix: source.path,
			entries: (await fetchJson<SitemapEntry[]>(source.endpoint)) ?? [],
		})),
	);

	const staticUrls = STATIC_SITEMAP_PATHS.map(
		path => `\t<url>\n\t\t<loc>${xmlEscape(`${url.origin}${path}`)}</loc>\n\t</url>`,
	);

	const dynamicUrls = sources.flatMap(({ pathPrefix, entries }) =>
		entries.map(entry => sitemapEntryUrl(url.origin, pathPrefix, entry)),
	);

	const xml =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
		[...staticUrls, ...dynamicUrls].join("\n") +
		`\n</urlset>\n`;

	return new Response(xml, {
		status: 200,
		headers: {
			"content-type": "application/xml; charset=utf-8",
			"cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
};

// ─── robots.txt ──────────────────────────────────────────────────────────────
const handleRobots = (url: URL): Response => {
	const body = [
		"User-agent: *",
		"Allow: /",
		...ROBOTS_DISALLOW.map(path => `Disallow: ${path}`),
		"",
		`Sitemap: ${url.origin}/sitemap.xml`,
		"",
	].join("\n");

	return new Response(body, {
		status: 200,
		headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "public, max-age=3600",
		},
	});
};

export default async function middleware(request: Request): Promise<Response | undefined> {
	const url = new URL(request.url);

	if (url.pathname === "/robots.txt") return handleRobots(url);
	if (url.pathname === "/sitemap.xml") return handleSitemap(url);
	if (url.pathname.startsWith("/products/")) return handleProductPage(request, url);

	return undefined;
}
