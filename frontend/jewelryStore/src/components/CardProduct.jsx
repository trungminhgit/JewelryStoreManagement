import {useContext} from "react";
import {cartContext} from "../helper/Context.js";

export default function CardProduct({id=null,name, subname, description, imageUrl}) {
    const {cart ,cartDispatch} = useContext(cartContext);
    console.log(cart);
    const addToCart = (id) => {
        cartDispatch({
            type:"add",
            payload:{
                id:id
            }
        })
    }
    const subtractToCart = (id) => {
        cartDispatch({
            type:"remove",
            payload:{
                id:id,
            }
        })
    }

    return (
        <>
            <div className="px-8 py-6 bg-purple-400 text-white rounded-lg max-w-[400px]">
                <div>
                    <img src={imageUrl} alt="image" className="object-cover" />
                </div>
                <div className="my-4">
                    <h3 className="text-4xl">{name}</h3>
                    <h4 className="text-xl font-light">{subname}</h4>
                </div>
                <p className="text-wrap break-all block">
                    {description}
                </p>
                <button onClick={()=>addToCart(id)} className="bg-yellow-400 px-4 py-2 text-white rounded-md mt-8">+</button>
                <button onClick={()=>subtractToCart(id)} className="bg-yellow-400 px-4 py-2 text-white rounded-md mt-8 ml-3">-</button>
            </div>
        </>
    )
}