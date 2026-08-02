import { create } from "zustand";

interface RecentSelectStoreType {
    selectedValue: string,
    setSelectedValue: (code:string) => void,
}

const RecentSelectStore = create<RecentSelectStoreType>()(
    (set) => ({

        selectedValue: "",

        setSelectedValue: (code)=> {
            set(() => {
                return{selectedValue: code}
            })
        },

    })
)
export default RecentSelectStore