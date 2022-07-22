
export interface PropertyReview {
    _id: string,
    host: string,
    hostName: string,
    rating: number,
    creationDate: string,
    lastUpdate: string,
    body?: string
    property: string
}