import { create } from "zustand";
import { drainOutbox } from "../outbox/outbox";

interface NetworkState {
  isOnline: boolean;
  wasOffline: boolean;
  setOnline: () => void;
  setOffline: () => void;
}

const useNetworkStore = create<NetworkState>()((set) => ({
  isOnline: navigator.onLine,
  wasOffline: false,
  setOnline: () => {
    set({ isOnline: true, wasOffline: true });
    drainOutbox();
    setTimeout(() => set({ wasOffline: false }), 4000);
  },
  setOffline: () => set({ isOnline: false }),
}));

export const registerNetworkListeners = () => {
  window.addEventListener("online", () => useNetworkStore.getState().setOnline());
  window.addEventListener("offline", () => useNetworkStore.getState().setOffline());
};

export default useNetworkStore;
