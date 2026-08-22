
export interface VariablesListResponse {
    Count: number,
    Message: string,
    SearchCriteria: string,
    Results: VariavlesListResults[],
}

export interface VariavlesListResults {
    DataType: string,
    Description: string,
    GroupName: string,
    ID: number,
    Name: string,
}