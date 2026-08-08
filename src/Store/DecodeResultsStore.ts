import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DecodeVinResult } from "../types/DecodeVinResponse";

interface DecodeResultType {
    data: DecodeVinResult[],
    error: {status: boolean, message: string},
    setDecodeResults: (data: DecodeVinResult[]) => void
}

const DecodeResultsStore = create<DecodeResultType>()(
    persist(
        (set) => ({
            data:[],
            error:{status: false, message: ""},

            setDecodeResults: (data) => {
                const diagnosticFields = ["Error Code", "Error Text", "Additional Error Text"];
                const filteredData = data?.filter(el => el.Value !== null && el.Value !== "" && !diagnosticFields.includes(el.Variable)) ?? [];
                const diagnosticData = data?.filter(el => diagnosticFields.includes(el.Variable));

                try{
                    const errorCodeField = diagnosticData.find(el => el.Variable === "Error Code");
                    const errorCode = errorCodeField ? Number(errorCodeField?.Value) : null
                    if(errorCode !== 0 && errorCode !== null){
                        throw new Error("incorrect VIN code")
                    }

                }catch(error){
                    set(() => {
                        return{error: {status: true, message: (error as Error).message}}
                    });
                    return
                }

                set(() => {
                    console.log(filteredData)
                    return{
                        data: [... filteredData],
                        error: {status: false, message: ""}
                    }
                })
            }
        }),
        {name: "decode-store"}
    )
)
export default DecodeResultsStore