
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import {
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { queryClient } from "./queryClient";

const DATABASE_NAME = "green-bridge-query-cache";
const STORE_NAME = "query-cache";
const CACHE_KEY = "public-content";

const PUBLIC_QUERY_ROOTS = new Set([
  "content-blocks",
  "programs",
  "resources",
]);

const isPublicContentQuery = (
  queryKey: readonly unknown[],
): boolean =>
  typeof queryKey[0] === "string" &&
  PUBLIC_QUERY_ROOTS.has(queryKey[0]);

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Unable to open IndexedDB"));

    request.onblocked = () => {
      reject(new Error("IndexedDB upgrade is blocked"));
    };
  });

const indexedDbStorage = {
  async getItem(key: string): Promise<string | undefined> {
    const database = await openDatabase();

    try {
      return await new Promise((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readonly");
        const request = transaction.objectStore(STORE_NAME).get(key);

        request.onsuccess = () => {
          const value: unknown = request.result;

          resolve(typeof value === "string" ? value : undefined);
        };

        request.onerror = () =>
          reject(request.error ?? new Error("Unable to read cached data"));

        transaction.onabort = () =>
          reject(transaction.error ?? new Error("IndexedDB read aborted"));
      });
    } finally {
      database.close();
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    const database = await openDatabase();

    try {
      await new Promise<void>((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readwrite");

        transaction.objectStore(STORE_NAME).put(value, key);

        transaction.oncomplete = () => resolve();

        transaction.onerror = () =>
          reject(transaction.error ?? new Error("Unable to persist query cache"));

        transaction.onabort = () =>
          reject(transaction.error ?? new Error("IndexedDB write aborted"));
      });
    } finally {
      database.close();
    }
  },

  async removeItem(key: string): Promise<void> {
    const database = await openDatabase();

    try {
      await new Promise<void>((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readwrite");

        transaction.objectStore(STORE_NAME).delete(key);

        transaction.oncomplete = () => resolve();

        transaction.onerror = () =>
          reject(transaction.error ?? new Error("Unable to clear query cache"));

        transaction.onabort = () =>
          reject(transaction.error ?? new Error("IndexedDB delete aborted"));
      });
    } finally {
      database.close();
    }
  },
};

const persister = createAsyncStoragePersister({
  storage: indexedDbStorage,
  key: CACHE_KEY,
  throttleTime: 1000,
});

interface QueryPersistenceProviderProps {
  children: ReactNode;
}

export const QueryPersistenceProvider = ({
  children,
}: QueryPersistenceProviderProps) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
      maxAge: Infinity,
      dehydrateOptions: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) &&
          isPublicContentQuery(query.queryKey),
      },
    }}
  >
    {children}
  </PersistQueryClientProvider>
);

export default QueryPersistenceProvider;
