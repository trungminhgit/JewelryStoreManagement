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
    const [loading, setLoading] = useState(false)
    const update = async ()=>{
        const data = {
            "firstName":firstName,
            "lastName":lastName,
            "email":email,
            "phone":phone
        }
        const token = Cookies.get("token");
        console.log(token)
        setLoading(true)
        if(avatarFile !== null){
            console.log(avatarFile)
            const _data = new FormData();
            _data.append("avatar", avatarFile);
            const response = await authApi(token).put(endpoints["update-avatar"](id),_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if(response.data.status===202){
                setLoading(false)
                userDispatch({
                    type:"change",
                    payload:{
                        message:response.data.message,
                    }
                })
            }


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
                            <img src={avatarURL} className="size-48 p-4 rounded-md"/>
                        </div>
                        <div className="mb-4">
                            <input type="file" className="mb-4" onChange={(e) => {
                                setAvatarFile(e.target.files[0])
                                console.log(e.target.files[0])
                            }}/>
                        </div>

                        <div className="mb-4 flex gap-2">
                            {loading && <div
                                className="flex items-center justify-center p-3 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <div role="status">
                                    <svg aria-hidden="true"
                                         className="size-6 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                            {!loading && <button onClick={update} type="button"
                                                 className=" text-white p-3 rounded-md border border-purple-500 bg-purple-500">
                                Update

                            </button>}
                            <input type="button" value="Cancel"
                                   className="text-black p-3 rounded-md border border-black"/>
                        </div>
                    </section>
                </section>


            </main>
        </>
    )
}