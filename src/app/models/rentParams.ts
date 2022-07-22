
export interface RentParams {
    pageNumber: number,
    pageSize: number,
    orderBy?: string;
    receiver?: string;
    sender?: string;
    status?: string,
}

export function getAxiosRentParams(rentParams: RentParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", rentParams.pageNumber.toString());
    params.append("pageSize", rentParams.pageSize.toString());

    if (rentParams.orderBy) {
        params.append("orderBy", rentParams.orderBy);
    }

    if (rentParams.status) {
        params.append("status", rentParams.status);
    }

    if (rentParams.receiver) {
        params.append("receiver", rentParams.receiver);
    }
    if (rentParams.sender) {
        params.append("sender", rentParams.sender);
    }




    return params;
}