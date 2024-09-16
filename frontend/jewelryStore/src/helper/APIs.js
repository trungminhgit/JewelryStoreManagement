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
    "comment-add":(productId)=>"/product/add-comment/"+productId,
    "user-search":(keyword) => `/user/search?firstName=${keyword}`,
    "product-search":(keyword) => `/product/search-product?productName=${keyword}`,
    "revenue-by-year": (year)=>`/revenue/year?year=${year}`,
    "revenue-by-quarter": (quarter, year)=>`/revenue/quarter?quarter=${quarter}&year=${year}`,
    "revenue-by-month": (month, year)=>`/revenue/month?month=${month}&year=${year}`,
    "revenue-by-week": (week, year)=>`/revenue/week?week=${week}&year=${year}`,
    "receipts":"/sale/add-receipt",
    "vn-pay":(amount)=>`/payment/vn-pay?amount=${amount}`,
    "vn-pay-callback":`http://localhost:8080/api/payment/`,
    "comment":(id)=>`/product/add-comment/${id}`,
    "comments":(productId)=>"/product/comments/"+productId,
}