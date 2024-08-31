import axios from 'axios';

const BASE_URL = "http://localhost:8080/api"
export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
export const standardApi = ()=> {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    })}
export const endpoints = {
    "users":"/user/list",
    "user":(id)=>"/user/"+id,
    "updateAvatar":(id)=>"/user/"+id+"/avatar",
    "register": "/user/register",
    "login":"/auth/login",
    "current-user":"/user/current-user"
}