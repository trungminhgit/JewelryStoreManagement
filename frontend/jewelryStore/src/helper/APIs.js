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
            'Authorization': `Bearer `
        }
    })}
export const endpoints = {
    "users":(pageNo)=>`/user/list?pageNo=${pageNo}`,
    "user":(id)=>"/user/"+id,
    "update-avatar":(id)=>"/user/"+id+"/avatar",
    "register": "/user/register",
    "login":"/auth/login",
    "current-user":"/user/current-user",
    "products":"/product/list-product",
    "user-search":(keyword) => `/user/search?firstName=${keyword}`
}