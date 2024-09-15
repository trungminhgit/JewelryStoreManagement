import NavBar from "../components/NavBar.jsx";
import {useContext, useEffect, useState} from "react";
import Footer from "../components/Footer.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {authApi, endpoints} from "../helper/APIs.js";
import Cookies from "js-cookie";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {cartContext} from "../helper/Context.js";

export default function DetailProduct2() {
    const {id} = useParams();
    const [product, setProduct]=useState(null);
    const fetchProduct = async (id) => {
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["product"](id));
        console.log(response.data.data)
        if(response.data.status===200){
            setProduct(response.data.data)
        }
    }
    const [comments, setComments]=useState([]);
    const fetchComments = async (id) => {
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["comments"](id));
        console.log("comments________",response.data)
        setComments(response.data.data)
    }
    const {cartDispatch} = useContext(cartContext);
    const addToCart = (id) => {

        toast.success("Add successfully", {onClose:()=>{
                cartDispatch({
                    type:"add",
                    payload:{
                        id:id
                    }
                })
            }, onClick:()=>{
                cartDispatch({
                    type:"add",
                    payload:{
                        id:id
                    }
                })
            }})

    }
    const subtractToCart = (id) => {
        toast.success("Subtract successfully",{ onClose:()=>{
                cartDispatch({
                    type:"remove",
                    payload:{
                        id:id,
                    }
                })
            }, onClick:()=>{
                cartDispatch({
                    type:"remove",
                    payload:{
                        id:id,
                    }
                })
            }})
    }
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(id)
        fetchProduct(id)
        fetchComments(id)
    },[])

    const [comment, setComment] = useState("")

    const addComment = async (id) => {
        const token = Cookies.get("token")
        console.log(token)
        const data = {
            description:comment
        }
        const response = await authApi(token).post(endpoints["comment"](id), data)
        if(response.data.status===201){
            fetchComments(id)
            setComment("")

        }
    }
    return (
        <>
            <ToastContainer position="top-right"/>
            <NavBar/>
            <section className="mx-auto w-[80%]">
                <h3 className="my-4 text-3xl">Chi tiet san pham</h3>

                {product &&
                    <section className="flex gap-4 flex-col md:flex-row">
                        <img className="basis-1/2 aspect-video object-cover h-fit bg-white" src={product.productImage}
                             alt="img"/>
                        <section className="basis-1/2">
                            <h4 className="mb-2 text-3xl">{product.productName}</h4>
                            <h3 className="mb-2 text-xl">{product.categoryName}</h3>
                            <p className="mb-10 text-lg ">{product.description}</p>
                            <div className="flex gap-4 items-center">
                                <input type="text" value={quantity} className="p-4 rounded-md size-12 text-2xl"/>
                                <input type="button" className="rounded-full bg-yellow-300 size-10" value="+"
                                       onClick={() => {
                                           setQuantity(quantity + 1)
                                           addToCart(product.productID)
                                       }}/>
                                <input type="button" className="rounded-full bg-yellow-300 size-10" value="-"
                                       onClick={() => {
                                           setQuantity(quantity - 1 < 0 ? 0 : quantity - 1)
                                           subtractToCart(product.productID)
                                       }}/>
                            </div>
                            <button className="mt-10 px-4 py-2 bg-yellow-300 rounded-md" onClick={()=>navigate("/cart")}>Mua</button>
                        </section>
                    </section>}

                    <section className="mt-4">
                        <div className="mb-4"><span className="inline-block py-1 px-4 text-white bg-purple-400">Comments</span></div>
                        <div className="mb-4 flex gap-3">
                            <input type="text" className="w-full p-3 rounded-md" placeholder="add comment" value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                            />
                            <button className="bg-yellow-300 p-3"
                                    onClick={()=>
                                    {
                                        addComment(product.productID)
                                    }
                            }>Comment</button>
                        </div>
                        {comments && comments.map(comment=> {
                            return (
                                <div key={comment.id} className="mb-4">
                                    <div className="mb-1 text-xl">{comment.description}</div>
                                    <div className="text-sm">{comment.createDate}</div>
                                </div>
                            )
                        })}
                    </section>
            </section>
            <Footer/>

        </>
    )
}