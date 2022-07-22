export interface NotificationParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
}

export function getAxiosNotificationParams(NotificationParams: NotificationParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", NotificationParams.pageNumber.toString());
    params.append("pageSize", NotificationParams.pageSize.toString());
    if (NotificationParams.orderBy) {
        params.append("orderBy", NotificationParams.orderBy);
    }

    return params;
}