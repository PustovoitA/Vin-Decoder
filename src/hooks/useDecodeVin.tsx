import { useMutation } from "@tanstack/react-query";
import { decodeVin } from "../api/vinApi";
import type { DecodeVinResponse } from "../types/DecodeVinResponse";


const useDecodeVin = () => {
    return useMutation<DecodeVinResponse, Error, string>({
        mutationFn: (vin: string) => decodeVin(vin)
    })
}