import {useContext} from "react";
import {cartContext} from "../helper/Context.js";
import {toast, ToastContainer} from "react-toastify";

export default function CardProduct({id=null,name, subname, description, imageUrl}) {
    const {cart ,cartDispatch} = useContext(cartContext);
    console.log(cart);
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
            <div className="px-8 py-6 bg-purple-400 text-white rounded-lg max-w-[400px]">
                <div>
                    <img src={imageUrl} alt="image" className="object-cover aspect-square" />
                </div>
                <div className="my-4">
                    <h3 className="text-4xl">{name}</h3>
                    <h4 className="text-xl font-light">{subname}</h4>
                </div>
                <p className="text-wrap break-all block">
                    {description}
                </p>
                <button onClick={()=>addToCart(id)} className="bg-yellow-400 px-4 py-2 text-white rounded-md mt-8">Add to cart</button>
            </div>
        </>
    )
}