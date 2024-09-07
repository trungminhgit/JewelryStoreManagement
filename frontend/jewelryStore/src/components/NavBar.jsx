import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {cartContext} from "../helper/Context.js";

export default function NavBar() {
    const navigate = useNavigate();
    const {cart} = useContext(cartContext);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let total = 0
        cart.cart.forEach((item) => {
            total += Number(item.quantity);
        })
        setTotal(total)
    }, [cart])

    return (
        <>
            <header className="bg-yellow-100">
                <nav className="w-[80%] mx-auto p-3  flex justify-between items-center">
                    <div>
                        <img src="../../public/logo.png" className="size-12" alt="logo"/>
                    </div>
                    <ul className="flex gap-16">
                        <li className="cursor-pointer hover:text-gray-800" onClick={()=>navigate("/client")}>Home</li>
                        <li className="cursor-pointer hover:text-gray-800" onClick={()=>navigate("/products-client")}>Product</li>
                        <li className="cursor-pointer hover:text-gray-800" onClick={()=>navigate("/cart")}>Payment</li>
                    </ul>
                    <div className="flex gap-3">
                        <div className="relative cursor-pointer" onClick={()=>navigate("/cart")}>
                            <svg className="size-12 text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M5     4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                            </svg>
                            <span className="text-2xl absolute -bottom-[10px] -right-[5px]">{total}</span>
                        </div>
                        <svg className="size-12 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-width="2"
                                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>

                    </div>
                </nav>
            </header>
        </>
    )
}