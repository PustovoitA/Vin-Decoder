import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentStoreType {
    selectedValue: string,
    setSelectedValue: (code:string) => void,
}

const RecentStore = create<RecentStoreType>()(
    persist(
        (set,get) => ({
            selectedValue: "",

            setSelectedValue: (code)=> {
                set(() => {
                    return{selectedValue: code}
                })
            },
        }),
        {name: "recent-storage"}
    )
);
export default RecentStore