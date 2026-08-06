
const BASE_URL = import.meta.env.BASE_URL

export async function decodeVin(vin: string) {
    const response = await fetch(`${BASE_URL}/decodevin/${vin}?format=json`);
    if (!response.ok) throw new Error("Failed to decode VIN");
    return response.json();
}

export async function getVariablesList() {
    const response = await fetch(`${BASE_URL}/getvehiclevariablelist?format=json`);
    if (!response.ok) throw new Error("Failed to fetch variables");
    return response.json();
}