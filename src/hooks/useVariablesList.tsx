import { useQuery } from "@tanstack/react-query"
import { getVariablesList } from "../api/vinApi"


export const useVariablesList = () => {
    return useQuery({
        queryKey: ["variavles-list"],
        queryFn: () => getVariablesList(),
    })
}