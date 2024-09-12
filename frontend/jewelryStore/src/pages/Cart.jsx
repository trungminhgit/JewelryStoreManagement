import NavBar from "../components/NavBar.jsx";
import CartItem from "../components/CartItem.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {cartContext} from "../helper/Context.js";
import {authApi, endpoints} from "../helper/APIs.js";

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

    const [receipts, setReceipts]=useState({})
    const pay = async () => {
        console.log(cart.cart)
        let receipts = {}
        if(cart.cart){
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
                console.log("response vn pay",_response)
            }
        }
    }


    return (
        <>
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
                            <button className="bg-yellow-100 text-xl text-black px-4 py-1 rounded-md" onClick={pay}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}