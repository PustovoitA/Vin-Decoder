import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DecodeVinResult } from "../types/DecodeVinResponse";

interface DecodeResultType {
    data: DecodeVinResult[],
    error: {status: boolean, message: string},
    isPending: boolean,
    setDecodeResults: (data: DecodeVinResult[]) => void,
    setError: (status: boolean, message: string) => void,
    setIsPanding: (value: boolean) => void
}

const DecodeResultsStore = create<DecodeResultType>()(
    persist(
        (set) => ({
            data:[],
            error:{status: false, message: ""},
            isPending: false,

            setDecodeResults: (data) => {
                const diagnosticFields = ["Error Code", "Error Text", "Additional Error Text"];
                const filteredData = data?.filter(el => el.Value !== null && el.Value !== "" && !diagnosticFields.includes(el.Variable)) ?? [];
                
                set(() => {
                    return{data: [... filteredData]}
                })
            },

            setError: (status, message) => {
                set(() => {
                    return{error: {status: status, message: message}}
                })
            },

            setIsPanding: (value) => {
                set(() => {
                    return{isPending: value}
                })
            }
        }),
        {name: "decode-store"}
    )
)
export default DecodeResultsStore