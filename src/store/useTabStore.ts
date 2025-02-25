import { TABS } from "@/lib/types";
import { create } from "zustand";

type State = {
    tab: TABS
}

type Action = {
    setTab: (tab: TABS) => void
}

export const useTabStore = create<State & Action>()((set) => ({
    tab: TABS.DOCUMENT,
    setTab: (tab) => set({tab})
}))