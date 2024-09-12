import {useContext, useEffect, useState} from "react";
import {userContext} from "../helper/Context.js";
import {authApi, endpoints, standardApi} from "../helper/APIs.js";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import * as response from "autoprefixer";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const {user, userDispatch} = useContext(userContext)
    const login = async ()=>{
        const data={
            "username":username,
            "password":password
        }
        const response = await standardApi().post(endpoints["login"], data);
        if(response.data.token){
            console.log(response.data)
            Cookies.remove("token")
            Cookies.set("token", response.data.token);
            userDispatch({
                type:"login",
                payload:{
                    user:username
                }
            })
            navigate("/");
        }else{
            toast.error("Invalid password")
        }
    }
    useEffect(() => {
        if(user.message)
        {
            toast.success(user.message)
            userDispatch({
                type:"delete",
                payload:null
            })
        }
    },[])
    return (
        <>
            <ToastContainer position="top-right"/>
            <section className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <img className="mx-auto" src="../../public/logo.png" alt="logo" />
                <div className="mt-4">
                    <div className="bg-gradient-to-t from-yellow-300 to-purple-400 p-0.5 rounded-md">
                        <div className="bg-white p-4 rounded-md">

                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="username">Username</label>
                                <input type="input" id="username" className="w-full border border-black p-4 rounded-md"
                                       placeholder="Username"
                                    value={username}
                                       onChange={(e)=>setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="password">Password</label>
                                <input type="password" id="password"
                                       className="w-full border border-black p-4 rounded-md"
                                       placeholder="Password"
                                    value={password}
                                       onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 flex gap-4">
                                <button className="bg-yellow-300 text-white px-4 py-2 rounded-md" onClick={login}>Sign in</button>
                                <button className="bg-white border border-black text-black px-4 py-2 rounded-md">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}