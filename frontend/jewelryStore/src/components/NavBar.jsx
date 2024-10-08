import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {cartContext, userContext} from "../helper/Context.js";
import {authApi, endpoints} from "../helper/APIs.js";
import Cookies from "js-cookie";

export default function NavBar() {
    const navigate = useNavigate();
    const {cart} = useContext(cartContext);
    const {user} = useContext(userContext);
    const [total, setTotal] = useState(0);
    const [userName, setUserName] = useState(null);

    const fetchCurrentUser = async () => {
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["current-user"])
        setUserName(response.data.data.username)
    }

    useEffect(() => {
        let total = 0
        console.log('cart', cart)
        cart.cart.forEach((item) => {
            total += Number(item.quantity);
        })
        setTotal(total)
        fetchCurrentUser()
    }, [cart])

    const [open, setOpen] = useState(false)

    const logout = () =>{
        Cookies.remove("token")

        setUserName("")
        navigate("/client")
        setOpen(false)

    }
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
                    <div className="flex gap-3 relative">
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
                        {!userName &&
                            <div onClick={() => navigate("/login")} className="flex gap-3 text-xl items-center cursor-pointer">
                                Log in
                            </div>
                        }
                        {userName&&
                            (
                                <>
                                    <div onClick={()=>{setOpen(!open)}} className="size-12 cursor-pointer flex items-center text-lg ml-4">{userName}</div>
                                    {open &&
                                        <div className="absolute -bottom-[100%] w-full bg-white">
                                            <div className="text-lg text-right px-3 py-1 w-full cursor-pointer hover:bg-gray-100" onClick={logout}>Log out
                                            </div>
                                        </div>
                                    }
                                </>
                            )
                        }


                    </div>
                </nav>
            </header>
        </>
    )
}