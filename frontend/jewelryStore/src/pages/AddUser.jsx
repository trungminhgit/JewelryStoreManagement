import Sidebar from "../components/Sidebar.jsx";
import React, {useContext, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import {endpoints, standardApi} from "../helper/APIs.js";
import {userContext} from "../helper/Context.js";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function AddUser() {
    const [open, setOpen] = useState(false);
    const {userDispatch} = useContext(userContext)
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatarFile, setAvatarFile]=useState(null)


    const register = async () => {
        if(avatarFile !== null){
            const _data = new FormData()
            _data.append('avatar', avatarFile)
        }



        const data = {
            "username":username,
            "password":password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "phone":phone,
        }
            console.log(data)
            // const response = await standardApi().get(endpoints["products"])
            // console.log(response.data)
            const response = await standardApi().post(endpoints["register"], data)
            if(response.data.status===201){
                console.log(response.data)
                console.log(response)
                userDispatch({
                    type:"register",
                    payload:{
                        message:response.data.message
                    }
                })
                navigate(-1)
            }
        }


    return (
        <>
            <ToastContainer position="top-right"/>
            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-8">
                        <h1 className="text-4xl">Add user</h1>
                    </section>
                    <section className="w-1/2">
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
                            <label className="mb-2 inline-block" htmlFor="password">Password</label>
                            <input type="password" id="password"
                                   className="w-full border border-black p-4 rounded-md"
                                   placeholder="Password"
                                   value={avatarFile}
                                   onChange={(e) => setAvatarFile(e.target.files[0])}
                            />
                        </div>
                        <div className="mb-4 flex gap-4">
                            <button onClick={register}
                                    className="bg-purple-400 text-white px-4 py-2 rounded-md">Sign in
                            </button>
                            <button
                                onClick={() => history.back()}
                                className="bg-white border border-black text-black px-4 py-2 rounded-md">Cancel
                            </button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}