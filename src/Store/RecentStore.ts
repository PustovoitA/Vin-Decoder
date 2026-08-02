import { create } from "zustand";
import { persist } from "zustand/middleware";


const RecentStore = create()(
    persist(
        (set,get) => ({}),
        {name: "recent-storage"}
    )
);
export default RecentStore