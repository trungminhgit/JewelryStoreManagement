import NavBar from "../components/NavBar.jsx";
import CartItem from "../components/CartItem.jsx";
import React, {useContext, useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {cartContext} from "../helper/Context.js";
import {authApi, endpoints} from "../helper/APIs.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

export default function Cart() {



    const {cart, cartDispatch} = useContext(cartContext);
    const [products, setProducts] = useState([])
    const dataFetchedRef = useRef(false);
    const fetchProduct = async (id, quantity) =>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["product"](id));
        setProducts((prev)=>([...prev,{item:response.data.data,quantity:quantity}]));
    }
    const [total, setTotal]=useState(0)
    const fetchProductOnCart = async () => {
        console.log(cart, cart.length)
       for(let item of cart.cart){
           console.log("item",item,"index");
           const token = Cookies.get("token")
           const response = await authApi(token).get(endpoints["product"](item.id));
           console.log("response",response.data, "item", item)
           setProducts((prev)=>[...prev,{item:response.data.data,quantity:item.quantity}]);
       }

    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchProductOnCart()
    }, [cart]);

    console.log("product",products)

    useEffect(()=>{
        let t = 0;
        if(cart.cart&&products){
            cart.cart.forEach((item,index)=>{
                t+=Number((item.quantity)*(products[index]?.item.price))
            })
            console.log(t)
            setTotal(t||0)
        }
    }, [cart.cart, products])

    const navigate = useNavigate()
    const [receipts, setReceipts]=useState({})
    const[loading, setLoading]=useState(false)
    const pay = async () => {
        console.log(cart.cart)
        let receipts = {}
        if(cart.cart){
            setLoading(true)
            const token = Cookies.get("token")
            console.log(token)
            for(let item of cart.cart){
                console.log("item",item)
                const response = await authApi(token).get(endpoints["product"](item.id));
                console.log("response",response.data)
                console.log("receipt",{productID:response.data.data.productID,quantity:item.quantity,productName:response.data.data.productName,price:response.data.data.price})

                // setReceipts((prev)=>
                //     (Object.fromEntries( Object.entries(prev).filter(([key,value])=>value.id!==response.data.data.productID) )))
                // setReceipts((prev)=>Array.from(prev).filter(i=>i.id.id!==response.data.data.productID))
                receipts=({...receipts, ["item"+response.data.data.productID.toString()]:{productID:response.data.data.productID,quantity:item.quantity,productName:response.data.data.productName,price:response.data.data.price}})
            }
            receipts=JSON.stringify(receipts)
            console.log("receipts______",receipts)
            const response = await authApi(token).post(endpoints["receipts"], receipts);
            console.log(response)
            if(response.data.status===202){
                console.log("response",response.data)
                const _response = await authApi(token).get(endpoints['vn-pay'](total))
                console.log("response vn pay",_response.data.data.paymentUrl)
                setLoading(false)
                console.log(_response.data.data.paymentUrl)
                window.open(_response.data.data.paymentUrl, "_blank")
            }
        }
    }
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status');
        status&&toast.success("Payment successfully!");
    }, []);





    return (
        <>
            <ToastContainer position="top-right"/>
            <NavBar />
            <section className="md:mx-auto w-full md:p-0 md:w-[80%]">
                <h3 className="mb-12 mt-7 text-4xl ml-4 lg:ml-0">Cart page</h3>
                <div className="flex flex-col md:flex-row gap-0 lg:gap-16">
                    <div className="flex flex-col w-full lg:w-2/3 p-4">
                        {products&&products.map((item,index)=><CartItem key={index} imageUrl={item.item.productImage} name={item.item.productName} type={item.item.categoryName} price={item.item.price} quantity={item.quantity} id={item.item.productID}/>)}
                    </div>
                    <div className="bg-black text-white w-full md:w-1/3 h-fit">
                        <div className="p-3 bg-black rounded-md">
                           <h4>Chi tiết đơn hàng</h4>
                        </div>
                        <div className="bg-white h-[80%] text-black">
                            <div className="py-10 pl-5 pr-16">
                                {products.map(((item,index)=>{
                                    return(
                                        <div className="text-black mb-3">
                                            <h4 className="font-normal text-xl md:text-md lg:text-xl">Product
                                                name:&nbsp;<span>{item.item.productName}</span>
                                            </h4>
                                            <p className="font-light">Quantity:&nbsp;<span>{cart.cart[index]?.quantity}</span></p>
                                            <p className="font-light">Total:&nbsp;<span>{(cart.cart[index]?.quantity)*(item.item.price)}</span></p>
                                        </div>
                                    )
                                }))}

                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-md bg-black">
                            <h4>Tổng cộng: {total}</h4>
                            {!loading && (
                                <button className="bg-yellow-100 text-xl text-black px-4 py-1 rounded-md"
                                        onClick={pay}>Thanh toán</button>
                            )}
                            {loading&& (
                                <div
                                    className="flex items-center justify-center py-1 px-2 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <div role="status">
                                        <svg aria-hidden="true"
                                             className="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-100"
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
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}