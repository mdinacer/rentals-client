import { Address } from "./address";
import { PropertyDetails } from "./propertyDetails";
import { PropertyPrice } from "./propertyPrice";
import { PropertyReview } from "./propertyReview";
import { PropertyServices } from "./propertyServices";
import { Image } from "./image";
import { UserProfile } from "./profile";

export interface Property {
    id: string,
    title: string,
    slug: string,
    type: string,
    description: string,
    price: PropertyPrice,
    address: Address,
    cover: Image,
    images: Image[],
    owner: UserProfile,
    available: Boolean,
    availableFrom?: string,
    creationDate: string,
    lastUpdate: string,
    rating: number,
    reviews: PropertyReview[],
    isOwner: boolean
    details: PropertyDetails,
    services: PropertyServices,
}

