import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentStoreType {}

const RecentStore = create<RecentStoreType>()(
    persist(
        (set,get) => ({}),
        {name: "recent-storage"}
    )
)