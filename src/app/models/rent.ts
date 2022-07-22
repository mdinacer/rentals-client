import { UserProfile } from "./profile";
import { Property } from "./property";

export interface Rent {
    id: string;
    sender: UserProfile, //{ id: string, fullName: string, address: string },
    receiver: UserProfile, //{ id: string, fullName: string, address: string },
    property: Property,//{ id: string, title: string, type: string, address: string },
    startDate: string,
    endDate: string,
    creationDate: string,
    status: string,
    price: number,
    accepted: boolean,
    active?: boolean
    duration?: number
}


export interface RentRequestCreate {
    startDate: string,
    endDate: string,
}

