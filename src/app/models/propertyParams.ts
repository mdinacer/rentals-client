import { PropertyType } from "./propertyType";
import { PropertyDetails } from "./propertyDetails";
import { PropertyServices } from "./propertyServices";
import { Address } from "./address";

export interface PropertyParams {
    pageNumber: number,
    pageSize: number,
    orderBy: string;
    rooms?: number,
    minPrice?: number,
    maxPrice?: number,
    type?: PropertyType,
    wilaya?: string,
    daira?: string,
    commune?: string,
    services?: PropertyServices
    details?: PropertyDetails
}


export function getAxiosPropertyParams(propertyParams: PropertyParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", propertyParams.pageNumber.toString());
    params.append("pageSize", propertyParams.pageSize.toString());
    if (propertyParams.orderBy) {
        params.append("orderBy", propertyParams.orderBy);
    }


    if (propertyParams.wilaya) {
        params.append("address.wilaya", propertyParams.wilaya);
    }
    else {
        params.delete("address.wilaya");
    }

    if (propertyParams.daira) {
        params.append("address.daira", propertyParams.daira);
    }
    else {
        params.delete("address.daira");
    }

    if (propertyParams.commune) {
        params.append("address.commune", propertyParams.commune);
    }
    else {
        params.delete("address.commune");
    }

    if (propertyParams.rooms && propertyParams.rooms > 0) {
        params.append("details.rooms", propertyParams.rooms.toString());
    }
    else {
    }

    if (propertyParams.minPrice && propertyParams.minPrice > 0) {
        params.append("minPrice", propertyParams.minPrice.toString());
    }
    else {
        params.delete("minPrice");
    }

    if (propertyParams.maxPrice && propertyParams.maxPrice > 0) {
        params.append("maxPrice", propertyParams.maxPrice.toString());
    }
    else {
        params.delete("maxPrice");
    }

    if (propertyParams.type) {
        params.append("type", propertyParams.type);
    } else {
        params.delete("type");
    }


    if (propertyParams.services) {
        const items = Object.entries(propertyParams.services)
            .map(([key, value]) => ({ name: `services.${key}`, value }));

        items.forEach(({ name, value }) => {
            if (value === true) {
                params.append(name, value)
            }
        })
    } else {
        params.delete("services");
    }

    return params;
}