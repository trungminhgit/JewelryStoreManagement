import Sidebar from "../components/Sidebar.jsx";
import React, {useContext, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import {authApi, endpoints, standardApi} from "../helper/APIs.js";
import {productContext, userContext} from "../helper/Context.js";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function addProduct() {
    const [open, setOpen] = useState(false);
    const {productDispatch} = useContext(productContext)
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [loading, setLoading] = useState(false)


    const add = async () => {
            const data = new FormData()

            data.append("price", price)
            data.append("description", description)
            data.append("productName", productName)
            data.append("categoryName", categoryName)
            data.append("materialName", materialName)
            data.append("file", productImage)

            console.log(data)
            // const response = await standardApi().get(endpoints["products"])
            // console.log(response.data)
            const token = Cookies.get("token")
            console.log(token)
        setLoading(true)
            const response = await authApi(token).post(endpoints["product-add"], data,{
                headers:{
                    "Content-Type":'multipart/form-data'
                }
            })
        console.log(response)
            if(response.data.status===201){
                setLoading(false)
                console.log(response.data)
                console.log(response)
                productDispatch({
                    type:"add",
                    payload:{
                        message:response.data.message,
                    }
                })
                navigate(-1)
            }
        }
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const token = Cookies.get("token");
            const response = await authApi(token).get(endpoints["categories"]);
            console.log(response.data)
            setCategories(response.data.data);
        }
        const fetchMeterials = async () => {
            const token = Cookies.get("token");
            const response = await authApi(token).get(endpoints["materials"]);
            console.log(response.data)
            setMaterials(response.data.data);
        }
        fetchCategories()
        fetchMeterials()

    }, []);

    return (
        <>
            <ToastContainer position="top-right"/>
            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-8">
                        <h1 className="text-4xl">Add product</h1>
                    </section>
                    <section className="w-1/2">
                        <div className="mb-4">
                            <label className="mb-2 inline-block" htmlFor="firstname">Product Name</label>
                            <input type="text" id="firstname"
                                   className="w-full border border-black p-4 rounded-md"
                                   placeholder="First Name"
                                   value={productName}
                                   onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 inline-block" htmlFor="category">Category Name</label>
                            <select id="category" className="w-full border border-black p-4 rounded-md"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            >
                                <option selected={true}>Select your option</option>
                                {categories.map(category => {
                                    return <option key={category.categoryID} value={category.categoryName}>{category.categoryName}</option>
                                })}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 inline-block" htmlFor="material">Material Name</label>
                            <select id="material" className="w-full border border-black p-4 rounded-md"
                                    value={materialName}
                                    onChange={(e)=>setMaterialName(e.target.value)}>
                                <option selected={true}>Select your option</option>
                                {materials.map(material => {
                                    return <option key={material.materialID} value={material.materialName}>{material.materialName}</option>
                                })}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 inline-block" htmlFor="price">Price</label>
                            <input type="text" id="price"
                                   className="w-full border border-black p-4 rounded-md"
                                   placeholder="First Name"
                                   value={price}
                                   onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 inline-block" htmlFor="description">Description</label>
                            <input type="text" id="description"
                                   className="w-full border border-black p-4 rounded-md"
                                   placeholder="First Name"
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 inline-block" htmlFor="productImage">Product Image</label>
                            <input type="file" id="productImage"
                                   className="w-full rounded-md"
                                   onChange={(e) => {
                                       setProductImage(e.target.files[0])
                                   }}
                            />
                        </div>
                        <div className="mb-4 flex gap-4">

                            {loading && <div
                                className="flex items-center justify-center p-3 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <div role="status">
                                    <svg aria-hidden="true"
                                         className="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
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
                            </div>}
                            {!loading && <button onClick={add}
                                                 className="bg-purple-400 text-white px-4 py-2 rounded-md">Sign in
                            </button>}
                            <button
                                onClick={() => history.back()}
                                className="bg-white border border-black text-black px-4 py-2 rounded-md">Cancel
                            </button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}