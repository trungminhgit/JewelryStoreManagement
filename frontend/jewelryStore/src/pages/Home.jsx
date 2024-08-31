import Sidebar from "../components/Sidebar.jsx";
import React, {useContext, useEffect} from "react";
import StatisticItem from "../components/StatisticItem.jsx";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import {authApi, endpoints} from "../helper/APIs.js";
import {useNavigate} from "react-router-dom";
import {userContext} from "../helper/Context.js";

export default function Home() {
    const {user, dispatch} = useContext(userContext)
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()
    const [users, setUsers] = React.useState([])
    const [paginates, setPaginates] = React.useState(0)
    const [keyword, setKeyword] = React.useState("")
    const search = async ()=>{
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["user-search"](keyword));
        console.log(response.data.data);
        setUsers(response.data.data.items);
    }
    const fetchUsers = async ()=>{
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["users"])
        setUsers(response.data.data.items)
        setPaginates(response.data.data)
        console.log(response.data.data)
        const arr = response.data.data
        console.log(arr.items.map(item => item.phone))
    }
    const del = async (id)=>{
        const token = Cookies.get("token");
        const response = await authApi(token).delete(endpoints["user"](id));
        console.log(response)
        if(response.data.status===204){
            dispatch({
                type:"delete",
                payload:{
                    message:response.data.message,
                }
            })
            toast.success(response.data.message)
            fetchUsers()
        }
    }

    useEffect(() => {
        fetchUsers();
        user.message&&toast.success(user.message)
    }, [])


    return (
        <>
            <ToastContainer position="top-right"/>

            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-8">
                        <h1 className="text-4xl">Tiêu đề</h1>
                    </section>
                    <div className="flex flex-wrap gap-4 w-full mb-8">
                        <StatisticItem/><StatisticItem/><StatisticItem/><StatisticItem/>
                    </div>
                    <section className="mb-8">
                        <h1 className="text-4xl">Tiêu đề</h1>
                    </section>
                    <div className="flex flex-col gap-4 ml-2 mb-4">
                        <div>
                            <input type="text" className="p-3 border border-black rounded-md text-lg"
                                   placeholder="keyword" value={keyword}
                                   onChange={(e)=>setKeyword(e.target.value)}/>
                            <button onClick={search} className="ml-3 bg-purple-500 p-3 text-white rounded-md text-lg">Search</button>
                        </div>
                        <div>
                            <button onClick={
                                ()=>navigate("/users/add")
                            } className="bg-purple-500 p-3 text-white rounded-md text-lg">Add</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="">
                            <thead>
                            <tr>
                                <th className="p-2 px-10 text-xl text-left border-8 border-white bg-black text-white">Id</th>
                                <th className="p-2 px-10  border-8  text-xl text-left border-white bg-black text-white">Avatar</th>
                                <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">First
                                    Name
                                </th>
                                <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Last
                                    Name
                                </th>
                                <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Email</th>
                                <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">Phone</th>
                                <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {users!==null && users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            {user.userID}
                                        </td>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            <img src={user.avatar} className="size-12 mx-auto"/>
                                        </td>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            {user.firstName}
                                        </td>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            {user.lastName}
                                        </td>

                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            {user.email}
                                        </td>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            {user.phone}
                                        </td>

                                        <td onClick={() => setOpen(!open)}
                                            className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white relative">
                                            <p onClick={
                                                ()=>navigate("users/"+user.userID)
                                            } className="py-2 px-4 text-black bg-yellow-300 mb-2 hover:bg-gray-100 hover:text-black">Edit</p>
                                            <p onClick={()=>{
                                                del(user.userID)
                                            }} className="py-2 px-4 text-black bg-yellow-300 hover:bg-gray-100 hover:text-black">Delete</p>
                                        </td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center gap-2">
                        <div className="p-3 bg-black text-white rounded-md">1</div>
                        <div className="p-3 bg-black text-white rounded-md">2</div>
                        <div className="p-3 bg-black text-white rounded-md">3</div>
                    </div>
                </section>
            </main>
        </>
    )
}