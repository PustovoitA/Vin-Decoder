import type { DecodeVinResponse } from "../types/DecodeVinResponse";

const BASE_URL = import.meta.env.VITE_API_URL

export async function decodeVin(vin: string): Promise<DecodeVinResponse> {
    const response = await fetch(`${BASE_URL}/vehicles/decodevin/${vin}?format=json`);
    if (!response.ok) throw new Error("Failed to decode VIN");
    return response.json();
}

export async function getVariablesList() {
    const response = await fetch(`${BASE_URL}/vehicles/getvehiclevariablelist?format=json`);
    if (!response.ok) throw new Error("Failed to fetch variables");
    return response.json();
}