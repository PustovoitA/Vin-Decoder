import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentStoreType {
    recent: string[] | [],
    maxLengthRecent: number,
    setRecent: (item:string) => void,
    deleteLastItem: () => void,
}

const RecentStore = create<RecentStoreType>()(
    persist(
        (set, get) => ({
            recent: [],
            maxLengthRecent: 3,

            setRecent:(item) => {
                const localRecent = get().recent;
                const localMaxLength = get().maxLengthRecent;

                if(localRecent.length === localMaxLength){
                    get().deleteLastItem();
                }

                set((state) => {
                    return{recent: [item, ...state.recent]}
                });
            },

            deleteLastItem: () => {
                const localRecetn = get().recent;
                const result:string[] = [];
                for(let i = localRecetn.length - 2; i >= 0; i--){
                    result.push(localRecetn[i]);
                }

                set(() => {
                    return{recent: [...result.reverse()]}
                })
            }
        }),
        {name: "recent-storage"}
    )
);
export default RecentStore