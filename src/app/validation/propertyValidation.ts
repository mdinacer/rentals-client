import * as yup from "yup";

const PropertyAddressValidationSchema = yup.object({
    wilaya: yup.string().required("This field is required"),
    daira: yup.string().required("This field is required"),
    commune: yup.string().required("This field is required"),
    address1: yup.string().required("This field is required"),
    address2: yup.string(),
});

const PropertyDetailsValidationSchema = yup.object({
    area: yup.number().typeError('Area must be a number').min(1, "Must be greater than 0").required(),
    floors: yup.number().typeError('Floors must be a number').min(0),
    rooms: yup.number().typeError('Rooms must be a number').min(1, "Must be greater than 0").required(),
    beds: yup.number().typeError('Beds must be a number').min(1, "Must be greater than 0").required(),
    baths: yup.number().typeError('Baths must be a number').min(1, "Must be greater than 0").required(),
    kitchens: yup.number().typeError('Kitchens must be a number').min(0),
    gardens: yup.number().typeError('Gardens must be a number').min(0),
    pool: yup.number().typeError('Pools must be a number').min(0),
    parking: yup.number().typeError('Parking must be a number').min(0),

});

const PropertyServicesValidationSchema = yup.object({
    accessibility: yup.boolean(),
    airConditioner: yup.boolean(),
    elevator: yup.boolean(),
    furniture: yup.boolean(),
    cityGas: yup.boolean(),
    heater: yup.boolean(),
    hotWater: yup.boolean(),
    internet: yup.boolean(),
    smokeFree: yup.boolean(),
    petsAllowed: yup.boolean()
});

export const PropertyValidationSchema = yup.object({
    type: yup.string().min(5).required(),
    title: yup.string().min(5).required(),
    description: yup.string().min(5, "Too short").required("This field is required"),
    details: PropertyDetailsValidationSchema,
    services: PropertyServicesValidationSchema,
    address: PropertyAddressValidationSchema,
    cover: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide a cover image')
    })
});

export const PropertyEditValidationSchema = yup.object({
    type: yup.string().min(5).required(),
    title: yup.string().min(5).required(),
    description: yup.string().min(5, "Too short").required("This field is required"),
    details: PropertyDetailsValidationSchema,
    services: PropertyServicesValidationSchema,
    address: PropertyAddressValidationSchema,
});
