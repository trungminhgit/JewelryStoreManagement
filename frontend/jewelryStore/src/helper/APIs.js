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
    "categories":"/category/list-categories",
    "materials":"/material/list-materials",
    "products":(pageNo)=>"/product/list-product?pageNo="+pageNo,
    "product-add":"product/add-product",
    "product":(id)=>"/product/"+id,
    "comments":(productId)=>"/product/comments/"+productId,
    "comment-add":(productId)=>"/product/add-comment/"+productId,
    "user-search":(keyword) => `/user/search?firstName=${keyword}`,
    "product-search":(keyword) => `/product/search-product?productName=${keyword}`,
}