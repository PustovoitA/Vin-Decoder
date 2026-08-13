import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentStoreType {
    recent: string[],
    maxLengthRecent: number,
    setRecent: (item:string) => void,
    deleteLastItem: () => void,
    deleteSelectedItem: (item: string) => void
}

const RecentStore = create<RecentStoreType>()(
    persist(
        (set, get) => ({
            recent: [],
            maxLengthRecent: 3,

            setRecent:(item) => {
                let localRecent = get().recent;
                const localMaxLength = get().maxLengthRecent;
                const deleteSelectedItem = get().deleteSelectedItem;

                if(localRecent.includes(item)){
                    deleteSelectedItem(item);
                    localRecent = get().recent;
                }

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
            },
            
            deleteSelectedItem: (item) => {
                const localRecent = get().recent;
                const result = localRecent.filter(el => el !== item);

                set(() => {
                    return{recent: [...result]}
                })
            }
        }),
        {name: "recent-storage"}
    )
);
export default RecentStore