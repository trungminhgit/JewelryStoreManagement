import {useContext, useState} from "react";
import {userContext} from "../helper/Context.js";
import {authApi, endpoints, standardApi} from "../helper/APIs.js";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
    const {dispatch} = useContext(userContext)
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage]=useState("")
    const register = async () => {
        if(password!==confirmPassword){
            toast.error("Password must match")
        }else{
            const data = {
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "phone":phone
            }

            console.log(data)
            // const response = await standardApi().get(endpoints["products"])
            // console.log(response.data)
            const response = await standardApi().post(endpoints["register"], data)
            if(response.status===200||response.status===201){
                dispatch({
                    type:"register",
                    payload:{
                        ...data,
                        message:response.data.message,
                    }
                })
                console.log(response.data)
                navigate("/login")
            }
        }


    }

    return (
        <>
            <ToastContainer position="top-right"/>

            <section className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <img className="mx-auto" src="../../public/logo.png" alt="logo" />
                <div className="mt-4">
                    <div className="bg-gradient-to-t from-yellow-300 to-purple-400 p-0.5 rounded-md">
                        <div className="bg-white p-4 rounded-md">
                            <div className="flex justify-between gap-4">
                                <div className="mb-4">
                                    <label className="mb-2 inline-block" htmlFor="firstname">First Name</label>
                                    <input type="text" id="firstname"
                                           className="w-full border border-black p-4 rounded-md"
                                           placeholder="First Name"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2 inline-block" htmlFor="lastname">Last Name</label>
                                    <input type="text" id="lastname"
                                           className="w-full border border-black p-4 rounded-md"
                                           placeholder="Last Name"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="email">Email</label>
                                <input type="email" id="email" className="w-full border border-black p-4 rounded-md"
                                       placeholder="Email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="phone">Phone</label>
                                <input type="text" id="phone" className="w-full border border-black p-4 rounded-md"
                                       placeholder="Phone"
                                       value={phone}
                                       onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="username">Username</label>
                                <input type="text" id="username" className="w-full border border-black p-4 rounded-md"
                                       placeholder="Username"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="password">Password</label>
                                <input type="password" id="password"
                                       className="w-full border border-black p-4 rounded-md"
                                       placeholder="Password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword"
                                       className="w-full border border-black p-4 rounded-md"
                                       placeholder="Confirm password"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {message&&<div className="mb-4 p-4 rounded-md bg-black text-white">{message}</div>}
                            <div className="mb-4 flex gap-4">
                                <button onClick={register}
                                        className="bg-yellow-300 text-white px-4 py-2 rounded-md">Sign in
                                </button>
                                <button
                                    className="bg-white border border-black text-black px-4 py-2 rounded-md">Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}