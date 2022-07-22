export interface MetaData {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface PaginationParams {
    pageNumber: number,
    pageSize: number,

}

export class PaginatedResponse<T>{
    items: T;
    metaData: MetaData;

    constructor(items: T, metaData: MetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}

export function getAxiosPaginationParams(paginationParams: PaginationParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", paginationParams.pageNumber.toString());
    params.append("pageSize", paginationParams.pageSize.toString());

    return params;
}