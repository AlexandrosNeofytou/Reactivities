import axios, { AxiosError, AxiosResponse } from "axios"
import { Activity } from "../models/activities";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => { setTimeout(resolve, delay); })
};

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response
}, (error: AxiosError) => {
    const { data, status,config } = error.response as AxiosResponse;

    switch (status) {
        case 400:

            if(config.method=="get" && Object.prototype.hasOwnProperty.call(data.errors,"id"))
            {
                router.navigate("/not-found");

            }   

            if(data.errors)
            {
                const modalStateErrors=[];

                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key]);
                    }
                }

                throw modalStateErrors.flat();
            }
            else 
            {
                toast.error("bad request");

            }
            break;

        case 401:
            toast.error("unauthorized");
            break;
        case 403:
            toast.error("forbidden");
            break;
        case 404:
            router.navigate("/not-found");
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate("/server-error");
            break;
    }
    return Promise.reject(error);


})

const responseBody = <T>(axiosResponse: AxiosResponse<T>) => axiosResponse.data;

const requests = {
    get: <T>(url: string) => axios.get(url).then(responseBody<T>),
    post: <T>(url: string, body: {}) => axios.post(url, body).then(responseBody<T>),
    put: <T>(url: string, body: {}) => axios.put(url, body).then(responseBody<T>),
    delete: <T>(url: string) => axios.delete(url).then(responseBody<T>),
}

const Activities = {
    list: () => requests.get<Activity[]>("/activities"),
    details: (id: string) => requests.get<Activity>("/activities/" + id),
    create: (activity: Activity) => requests.post<Activity>("/activities", activity),
    update: (activity: Activity) => requests.put<Activity>("/activities/" + activity.id, activity),
    delete: (id: string) => requests.delete<Activity>("/activities/" + id),



}

export const agent = {
    Activities
}