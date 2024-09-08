import NavBar from "../components/NavBar.jsx";
import CardProduct from "../components/CardProduct.jsx";
import Footer from "../components/Footer.jsx";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {authApi, endpoints} from "../helper/APIs.js";

export default function Products2() {
    const [loading, setLoading] = React.useState(false)

    const [products, setProducts] = useState([]);
    const [paginates, setPaginates] = React.useState(0)
    const [keyword, setKeyword] = React.useState("");
    const fetchProducts = async (pageNo = 0)=>{
        const token = Cookies.get("token");
        setLoading(true)
        const response = await authApi(token).get(endpoints["products"](pageNo));
        setProducts(response.data.data.items)
        setPaginates(response.data.data)
        setLoading(false)
        console.log("user ",response.data.data)
        const arr = response.data.data
        console.log(arr.items.map(item => item.phone))
    }
    const length = paginates.totalPage; // Length of the array
    const array = Array.from({ length }, (_, index) => index);
    useEffect(() => {
        fetchProducts()
    }, [])
    const search = async ()=>{
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["product-search"](keyword));
        console.log(response.data.data);
        setProducts(response.data.data.items);
    }
    return (
        <>
            <NavBar/>
            <main className="w-[80%] mx-auto">
                <h1 className="mb-8 text-4xl mt-8">Danh sách sản phẩm</h1>
                <div className="flex gap-2">
                    <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="Enter keyword" className="text-md px-4 py-2 bg-white border border-black rounded-md"/>
                    <button onClick={search} className="px-4 py-2 rounded-md bg-purple-400 text-white">Search</button>
                </div>

                <div className="flex gap-x-2 gap-y-4 flex-wrap mt-8">
                    {loading &&
                        <div
                            className="flex items-center justify-center w-full h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <div role="status">
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-500"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                    {!loading &&
                        products.map(products=>{
                            return <CardProduct key={products.productID} name={products.productName} subname={products.categoryName}
                                description={products.description} imageUrl={products.productImage}
                            />
                        })
                    }

                </div>
                {!loading&&products.length > 0 &&
                    <div className="flex justify-center gap-2 py-8">
                        {array.map((item, index) => {
                            if (index === paginates.pageNo)
                                return <div key={index} onClick={() => {
                                    fetchProducts(index)
                                }}
                                            className="text-white bg-orange-500 p-3 px-4 rounded-lg cursor-pointer">{index + 1}</div>
                            else
                                return <div key={index} onClick={() => {
                                    fetchProducts(index)
                                }} className="text-white bg-black p-3 px-4 rounded-lg cursor-pointer">{index + 1}</div>
                        })}

                    </div>
                }
            </main>
            <Footer/>
        </>
    )
}