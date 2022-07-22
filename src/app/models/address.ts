export interface Address {
    wilaya: string,
    daira: string,
    commune: string,
    address1: string,
    address2: string,
    location: location
}

export interface AddressCreate {
    city: string,
    address1: string,
    address2?: string,
    location?: location
}

export interface location {
    long: string,
    lat: string
}

export interface Wilaya {
    id: string,
    name: string,
    nameAr: string,
    code: number;
}

export interface Daira {
    id: string,
    name: string,
    nameAr: string,
    wilaya: string;
}

export interface Commune {
    id: string,
    name: string,
    nameAr: string,
    wilaya: string;
    daira: string;
}

