import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Property } from "../models/property";
import { PropertyReview } from "../models/propertyReview";
import { PaginatedResponse } from "../models/pagination";
import { Rent } from "../models/rent";
import { User } from "../models/user";
import { store } from "../store/configureStore";


const sleep = () => new Promise(resolve => setTimeout(resolve, 0));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token && config.headers) {
        config.headers["x-auth-token"] = `${token}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {

    if (process.env.NODE_ENV === "development") {
        await sleep();
    }

    const pagination = response.headers["pagination"];


    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response;
}, (error: AxiosError<any, any>) => {
    if (error.response) {
        const { data, status } = error.response;

        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title)
                break;

            case 401:
                toast.error(data.title)
                break;

            case 403:
                toast.error("You are not allowed")
                break;

            case 404:
                history.push('/not-found', data);
                break;

            case 500:
                history.push('/server-error', data);
                break;

            default:
                break;
        }
    }
    return Promise.reject(error.response);
})

const requests = {
    get: <T>(url: string, params?: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
    delete: <T>(url: string, body?: {}) => axios.delete<T>(url, body).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(responseBody),
}

// function createFormData(item: any) {
//     let formData = new FormData();
//     for (const key in item) {
//         formData.append(key, item[key])
//     }
//     return formData
// }



// function buildFormData(formData: any, data: any, parentKey?: any) {
//     if (
//         data &&
//         typeof data === 'object' &&
//         !(data instanceof Date) &&
//         !(data instanceof File)
//     ) {
//         Object.keys(data).forEach((key) => {
//             buildFormData(
//                 formData,
//                 data[key],
//                 parentKey ? `${parentKey}.${key}` : key
//             );
//         });
//     } else {
//         const value = data == null ? '' : data;

//         formData.append(parentKey, value);
//     }
// }

// function jsonToFormData(data: any) {
//     const formData = new FormData();

//     buildFormData(formData, data);

//     return formData;
// }

const Address = {
    listWilayas: () => requests.get('addresses/wilaya'),
    listDairas: (countryId: string) => requests.get(`addresses/${countryId}/daira`,),
    listCommunes: (provinceId: string) => requests.get(`addresses/${provinceId}/commune`),
}
const Account = {
    login: (values: any) => requests.post<User>('auth/', values),
    register: (values: any) => requests.post('users/', values),
    createProfile: (values: any) => requests.postForm(`profiles/`, values),
    updateProfile: (values: any) => requests.putForm(`profiles/`, values),
    currentUser: () => requests.get<User>('auth/me'),
}



const Properties = {
    list: (params: URLSearchParams) => requests.get<Property[]>('properties', params),
    listByUser: () => requests.get<Property[]>('properties/me'),
    details: (slug: string) => requests.get<Property>(`properties/${slug}`),
    create: (property: any) => requests.postForm(`properties/`, property),
    update: (id: string, property: any) => requests.putForm(`properties/${id}`, property),
    delete: (id: string) => requests.delete<void>(`properties/${id}`),
    setFav: (id: string) => requests.put(`properties/${id}/favorite`, {}),
    deleteImages: (id: string, images: any) => requests.put(`properties/${id}/deleteImages`, { images }),
    availability: (id: string, values: any) => requests.put(`properties/${id}/availability`, values),
}

const Reviews = {
    list: (propertyId: string, params?: URLSearchParams) => requests.get<PropertyReview[]>(`reviews/${propertyId}`, params),
    create: (propertyId: string, review: any) => requests.post(`reviews/${propertyId}`, review),
    update: (id: string, review: any) => requests.put<Property>(`reviews/${id}`, review),
    delete: (id: string) => requests.delete<void>(`reviews/${id}`),
}

const Rents = {
    list: (params?: URLSearchParams) => requests.get<Rent[]>(`rents/`, params),
    details: (id: string) => requests.get<Rent>(`rents/${id}`),
    getActiveRequest: (propertyId: string) => requests.get<Rent>(`rents/${propertyId}/active`),
    create: (propertyId: string, rent: any) => requests.post(`rents/${propertyId}`, rent),
    update: (id: string, rent: any) => requests.put(`rents/${id}`, rent),
    acceptRequest: (id: string) => requests.put(`rents/${id}/accept`, {}),
    cancelRequest: (id: string) => requests.put(`rents/${id}/cancel`, {}),
    delete: (id: string) => requests.delete<void>(`rents/${id}`),
}

const Location = {
    getLocation: (lat: number, long: number, lang: string = "en") => axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&addressdetails=1&format=json&accept-language=${lang}&zoom=18`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: false }).then(responseBody),
}

const Notifications = {
    list: () => requests.get<Notification[]>('notifications',),
}

const agent = {
    Address,
    Account,
    Properties,
    Location,
    Notifications,
    Rents,
    Reviews
}

export default agent;