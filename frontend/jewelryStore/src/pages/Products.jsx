import Sidebar from "../components/Sidebar.jsx";
import React, {useContext, useEffect} from "react";
import {productContext, userContext} from "../helper/Context.js";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {authApi, endpoints} from "../helper/APIs.js";
import {toast, ToastContainer} from "react-toastify";

export default function Products() {
    const [open, setOpen] = React.useState(false);

    const {product, productDispatch} = useContext(productContext)
    const navigate = useNavigate()
    const [products, setProducts] = React.useState([])
    const [paginates, setPaginates] = React.useState(0)
    const [keyword, setKeyword] = React.useState("")

    const [loading, setLoading] = React.useState(false)

    const search = async ()=>{
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["product-search"](keyword));
        console.log(response.data.data);
        setProducts(response.data.data.items);
    }
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
    const del = async (id)=>{
        const token = Cookies.get("token");
        const response = await authApi(token).delete(endpoints["product"](id));
        console.log(response)
        if(response.data.status===204){
            productDispatch({
                type:"delete",
                payload:{
                    message:response.data.message,
                }
            })
            toast.success(response.data.message)
            fetchProducts()
        }
    }

    const length = paginates.totalPage; // Length of the array
    const array = Array.from({ length }, (_, index) => index);



    useEffect(() => {
        fetchProducts();
        console.log("message",product.message)
        product.message&&toast.success(product.message)
    }, [])

    return (
        <>
            <ToastContainer position="top-right"/>
            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-12">
                        <h1 className="text-4xl">Products</h1>
                    </section>
                    <div className="flex flex-col gap-4 ml-2 mb-4">
                        <div>
                            <input type="text" className="p-3 border border-black rounded-md text-lg"
                                   placeholder="keyword" value={keyword}
                                   onChange={(e) => setKeyword(e.target.value)}/>
                            <button onClick={search}
                                    className="ml-3 bg-purple-500 p-3 text-white rounded-md text-lg">Search
                            </button>
                        </div>
                        <div>
                            <button onClick={
                                () => navigate("/products/add")
                            } className="bg-purple-500 p-3 text-white rounded-md text-lg">Add
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {!loading &&
                            <table className="w-full">
                                <thead>
                                <tr>
                                    <th className="p-2 px-10 text-xl text-left border-8 border-white bg-black text-white">Id</th>
                                    <th className="p-2 px-10  border-8  text-xl text-left border-white bg-black text-white">Image</th>
                                    <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Product
                                        Name
                                    </th>
                                    <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Price

                                    </th>
                                    <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Description</th>
                                    <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Category</th>
                                    <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Material</th>
                                    <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {products !== null && products.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                {product.productID}
                                            </td>
                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                <img src={product.productImage} className="size-12 mx-auto"/>
                                            </td>
                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                {product.productName}
                                            </td>
                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                {product.price}
                                            </td>

                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                {product.description}
                                            </td>
                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                {product.categoryName}
                                            </td>
                                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                                {product.materialName}
                                            </td>
                                            <td onClick={() => setOpen(!open)}
                                                className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white relative">
                                                <p onClick={
                                                    () => navigate("/products/" + product.productID)
                                                }
                                                   className="py-2 px-4 text-black bg-yellow-300 mb-2 hover:bg-gray-100 hover:text-black">Edit</p>
                                                <p onClick={() => {
                                                    del(product.productID)
                                                }}
                                                   className="py-2 px-4 text-black bg-yellow-300 hover:bg-gray-100 hover:text-black">Delete</p>
                                            </td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </table>
                        }
                        {loading&&
                            <div
                                className="flex items-center justify-center w-full h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <div role="status">
                                    <svg aria-hidden="true"
                                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
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
                </section>
            </main>
        </>
    )
}