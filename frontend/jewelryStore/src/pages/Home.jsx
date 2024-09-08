import Sidebar from "../components/Sidebar.jsx";
import React, {useContext, useEffect} from "react";
import StatisticItem from "../components/StatisticItem.jsx";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import {authApi, endpoints} from "../helper/APIs.js";
import {useNavigate} from "react-router-dom";
import {userContext} from "../helper/Context.js";

export default function Home() {
    const {user, userDispatch} = useContext(userContext)
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
    const fetchUsers = async (pageNo=0)=>{
        const token = Cookies.get("token");
        const response = await authApi(token).get(endpoints["users"](pageNo))
        setUsers(response.data.data.items)
        setPaginates(response.data.data)
        console.log(response.data.data)
        const arr = response.data.data
        console.log(arr.items.map(item => item.phone))
    }
    const length = paginates.totalPage; // Length of the array
    const array = Array.from({ length }, (_, index) => index);
    const del = async (id)=>{
        const token = Cookies.get("token");
        const response = await authApi(token).delete(endpoints["user"](id));
        console.log(response)
        if(response.data.status===204){
            userDispatch({
                type:"delete",
                payload:{
                    message:response.data.message,
                }
            })
            toast.success(response.data.message)
            fetchUsers()
        }
    }

    const [revenueYear, setRevenueYear] = React.useState(0);
    const [revenueQuarter, setRevenueQuarter]= React.useState(0)
    const [revenueMonth, setRevenueMonth]=React.useState(0)
    const [revenueWeek, setRevenueWeek]=React.useState(0)
    const fetchRevenueYear = async (year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-year"](year))
        if(response.data.status===200){
            setRevenueYear(response.data.data)
        }
    }
    const fetchRevenueQuarter = async (quarter,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-quarter"](quarter,year))
        if(response.data.status===200){
            console.log("quarter",response.data)
            setRevenueQuarter(response.data.data||0)
        }
    }
    const fetchRevenueMonth = async (month,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-month"](month,year))
        if(response.data.status===200){
            setRevenueMonth(response.data.data||0)
        }
    }
    const fetchRevenueWeek = async (week,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-week"](week,year))
        if(response.data.status===200){
            setRevenueWeek(response.data.data||0)
        }
    }
    useEffect(() => {
        const currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth()+1;
        let quarter = (currentDate.getMonth()+1)/3
        function getWeekOfMonth(date) {
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // First day of the month
            const dayOfMonth = date.getDate(); // Current day of the month
            const startDayOfWeek = startOfMonth.getDay(); // Day of the week the month starts (0 = Sunday, 6 = Saturday)

            // Calculate the week number
            const adjustedDate = dayOfMonth + startDayOfWeek;
            const weekNumber = Math.ceil(adjustedDate / 7);

            return weekNumber;
        }
        const week = getWeekOfMonth(currentDate);
        console.log(month)
        console.log("quarter",quarter)
        console.log("week",week)
        console.log("month",month)
        console.log("year", year)
        fetchUsers();
        fetchRevenueYear(year)
        fetchRevenueQuarter(quarter,year)
        fetchRevenueMonth(month,year)
        fetchRevenueWeek(week,year)
        console.log("message", user.message)
        user.message&&toast.success(user.message)
    }, [])


    return (
        <>
            <ToastContainer position="top-right"/>

            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-8">
                        <h1 className="text-4xl">Statistics</h1>
                    </section>
                    <div className="flex flex-wrap gap-4 w-full mb-8">
                        <StatisticItem title="revenue year" data={revenueYear}/><StatisticItem title="revenue quarter" data={revenueQuarter}/>
                        <StatisticItem title="revenue month" data={revenueMonth}/><StatisticItem title="revenue week" data={revenueWeek}/>
                    </div>
                    <section className="mb-8">
                        <h1 className="text-4xl">Users</h1>
                    </section>
                    <div className="flex flex-col gap-4 ml-2 mb-4">
                        <div>
                            <input type="text" className="p-3 border border-black rounded-md text-lg"
                                   placeholder="keyword" value={keyword}
                                   onChange={(e) => setKeyword(e.target.value)}/>
                            <button onClick={search}
                                    className="ml-3 bg-purple-500 p-3 text-white rounded-md text-lg">Search
                            </button>
                        </div>
                        <div>
                            <button onClick={
                                () => navigate("/users/add")
                            } className="bg-purple-500 p-3 text-white rounded-md text-lg">Add
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
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
                            {users !== null && users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            {user.userID}
                                        </td>
                                        <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                            <img src={user.avatar ? user.avatar : "../../public/ring.png"}
                                                 className="size-12 mx-auto"/>

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
                                                () => navigate("/users/" + user.userID)
                                            }
                                               className="py-2 px-4 text-black bg-yellow-300 mb-2 hover:bg-gray-100 hover:text-black">Edit</p>
                                            <p onClick={() => {
                                                del(user.userID)
                                            }}
                                               className="py-2 px-4 text-black bg-yellow-300 hover:bg-gray-100 hover:text-black">Delete</p>
                                        </td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center gap-2 py-8">
                        {array.map((item, index) => {
                            if (index === paginates.pageNo)
                                return <div key={index} onClick={() => {
                                    fetchUsers(index)
                                }}
                                            className="text-white bg-orange-500 p-3 px-4 rounded-lg cursor-pointer">{index + 1}</div>
                            else
                                return <div key={index} onClick={() => {
                                    fetchUsers(index)
                                }} className="text-white bg-black p-3 px-4 rounded-lg cursor-pointer">{index + 1}</div>
                        })}

                    </div>
                </section>
            </main>
        </>
    )
}