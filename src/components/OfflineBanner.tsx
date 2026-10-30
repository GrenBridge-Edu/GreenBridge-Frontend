import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";

import useNetworkStore from "../data/stores/networkStore";

const OfflineBanner = () => {
	const online = useNetworkStore(state => state.isOnline);
	const wasOffline = useNetworkStore(state => state.wasOffline);

	const visible = !online || wasOffline;

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					key="network-status"
					initial={{ opacity: 0, height: 0, y: -8 }}
					animate={{ opacity: 1, height: "auto", y: 0 }}
					exit={{ opacity: 0, height: 0, y: -8 }}
					transition={{
						duration: 0.25,
						ease: [0.22, 1, 0.36, 1],
					}}
					role="status"
					aria-live="polite"
					aria-atomic="true"
					className="overflow-hidden"
					style={{
						background: online
							? "var(--color-success)"
							: "var(--color-warning)",
						color: "#000",
					}}>
					<div className="flex items-center justify-center gap-2 px-4 py-2.5 text-center text-sm font-semibold">
						{online ? (
							<>
								<span
									className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs"
									aria-hidden="true">
									✓
								</span>
								<span>Back online — your data is syncing</span>
							</>
						) : (
							<>
								<WifiOff size={16} className="shrink-0" aria-hidden="true" />
								<span>
									No internet connection — changes will sync when you reconnect
								</span>
							</>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default OfflineBanner;
