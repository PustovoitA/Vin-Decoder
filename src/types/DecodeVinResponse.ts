

export interface DecodeVinResponse {
    Count: number,
    Message: string,
    SearchCriteria: string,
    Results: DecodeVinResult[]
}

export interface DecodeVinResult {
    Value: string | null,
    ValueId: string | null,
    Variable: string,
    VariableId: number
}