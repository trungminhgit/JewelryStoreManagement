import Sidebar from "../components/Sidebar.jsx";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {authApi, endpoints, standardApi} from "../helper/APIs.js";
import {userContext} from "../helper/Context.js";

export default function EditUser() {
    const {id} = useParams();
    const [open, setOpen] = React.useState(false);
    const {userDispatch} = useContext(userContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate()
    const [avatarURL, setAvatarURL] = useState("");
    const [avatarFile, setAvatarFile] = useState(null)

    const update = async ()=>{
        const data = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "phone":phone
        }
        const token = Cookies.get("token");
        console.log(token)
        if(avatarFile !== null){
            console.log(avatarFile)
            const _data = new FormData();
            _data.append("avatar", avatarFile);
            const response = await authApi(token).put(endpoints["update-avatar"](id),_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            userDispatch({
                type:"change",
                payload:{
                    message:response.data.message,
                }
            })

        }
        const response = await authApi(token).put(endpoints["user"](id), data)
        if(response.data.status===202){
            console.log(response.data)
            userDispatch({
                type:"change",
                payload:{
                    message:response.data.message,
                }
            })
            navigate(-1)

        }
    }


    useEffect(() => {
        const fetchUserById = async () => {
            const token = Cookies.get('token');
            const response = await authApi(token).get(endpoints["user"](id))
            if(response.status === 200){
                console.log(response.data.data)
                setFirstName(response.data.data.firstName)
                setLastName(response.data.data.lastName)
                setPhone(response.data.data.phone)
                setEmail(response.data.data.email)
                setAvatarURL(response.data.data.avatar)
            }
        }
        fetchUserById()
    }, []);

    return (
        <>
            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-8">
                        <h1 className="text-4xl">Edit user</h1>
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
                        <div></div>
                        <div className="mb-4">
                            <img src={avatarURL} className="w-full p-4 rounded-md"/>
                        </div>
                        <div className="mb-4">
                            <input type="file" className="mb-4" onChange={(e) => {
                                setAvatarFile(e.target.files[0])
                                console.log(e.target.files[0])
                            }}/>
                        </div>

                        <div className="mb-4 flex gap-2">
                            <input onClick={update} type="button" value="Update"
                                   className=" text-white p-3 rounded-md border border-purple-500 bg-purple-500"/>
                            <input type="button" value="Cancel"
                                   className="text-black p-3 rounded-md border border-black"/>
                        </div>
                    </section>
                </section>


            </main>
        </>
    )
}