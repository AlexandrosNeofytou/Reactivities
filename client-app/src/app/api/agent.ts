import axios, { AxiosResponse } from "axios"
import { Activity } from "../models/activities";

const sleep=(delay:number)=>{
    return new Promise((resolve)=>{setTimeout(resolve,delay);})
};

axios.defaults.baseURL='http://localhost:5000/api'

axios.interceptors.response.use(async response=>{
    try{
        await sleep(1000);
    }
    catch(error)
    {
        console.log(error);
    }
    return response
})

const responseBody=<T>(axiosResponse:AxiosResponse<T>)=>axiosResponse.data;

const requests={
    get:<T>(url:string)=>axios.get(url).then(responseBody<T>),
    post:<T>(url:string,body:{})=>axios.post(url,body).then(responseBody<T>),
    put:<T>(url:string,body:{})=>axios.put(url,body).then(responseBody<T>),
    delete:<T>(url:string)=>axios.delete(url).then(responseBody<T>),
}

const Activities={
    list:()=>requests.get<Activity[]>("/activities"),
    details:(id:string)=>requests.get<Activity>("/activities/"+id),
    create:(activity:Activity)=>requests.post<Activity>("/activities",activity),
    update:(activity:Activity)=>requests.put<Activity>("/activities/"+activity.id,activity),
    delete:(id:string)=>requests.delete<Activity>("/activities/"+id),



}

export const agent={
    Activities
}