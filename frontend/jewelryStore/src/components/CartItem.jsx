import {useContext, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {cartContext} from "../helper/Context.js";

export default function CartItem({id,name, price, type, quantity, imageUrl}) {
    const {cartDispatch} = useContext(cartContext)
    const [_quantity, setQuantity] = useState(quantity);
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
    return (
        <>
            <ToastContainer position='top-right'/>
            <div className="flex justify-between mb-5">
                <div className="flex gap-5">
                    <div className="w-[35%]">
                        <img src={imageUrl} className="aspect-square" alt="image"/>
                    </div>
                    <section>
                        <h3 className="text-xl md:text-sm lg:text-lg">{name}</h3>
                        <h4 className="text-lg font-light md:text-sm lg:text-lg">{type}</h4>
                        <h3 className="text-md font-serif ">{price}</h3>
                    </section>
                </div>
                <div className="flex gap-2 mr-6">
                    <div><input type="text" value={_quantity}className="size-14 md:size-10 lg:size-14 text-2xl text-center border border-black rounded-xl"/></div>
                    <div><input type="button" value="+" onClick={()=>{
                        setQuantity(_quantity+1)
                        addToCart(id)
                    }} className="size-10 md:size-6 lg:size-10 bg-yellow-100 border rounded-[50px]"/></div>
                    <div><input type="button" value="-" onClick={()=>{
                        setQuantity(_quantity-1<=1?1:_quantity-1)
                        subtractToCart(id)
                    }} className="size-10 md:size-6 lg:size-10 bg-yellow-100 border rounded-[50px]"/></div>
                </div>
            </div>
        </>
    )
}