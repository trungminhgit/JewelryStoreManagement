import React, {useContext, useEffect} from "react";
import {authApi, endpoints} from "../helper/APIs.js";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {userContext} from "../helper/Context.js";

export default function Sidebar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const {dispatch} = useContext(userContext)
    const navigate = useNavigate();
    const [userName, setUserName] = React.useState("");
    const [userId, setUserId] = React.useState("");
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const token = Cookies.get("token");
            console.log(token)
            const response = await authApi(token).get(endpoints["current-user"])
            setUserName(response.data.data.username)
            setUserId(response.data.data.userID)
        }
        fetchCurrentUser()
    }, []);

    const logout = () =>{
        dispatch({
            type:"logout"
        })

    }

    return (
        <div className="bg-black">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar"
                   className="bg-black fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                        type="button"
                        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>

                </button>
                <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <img src="../../public/logo.png" className="me-3 size-14"
                             alt="Flowbite Logo"/>
                    </a>
                    <ul className="space-y-3 font-medium">

                        <li>
                            <div  onClick={()=>navigate("/")}
                               className="flex items-center p-2 bg-yellow-100 text-black rounded-r-[50px] hover:bg-yellow-200 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/>
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/>
                                </svg>

                                <span className="ms-3">Dashboard</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={()=>navigate("/users/")}
                               className="flex items-center p-2 bg-yellow-100 text-black rounded-r-[50px] hover:bg-yellow-200 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                          d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>

                                <span className=" ms-3 whitespace-nowrap">Users</span>
                            </div>
                        </li>
                        <li>
                            <div
                               className="flex items-center p-2 bg-yellow-100 text-black rounded-r-[50px] hover:bg-yellow-200 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                          d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>


                                <span className=" ms-3 whitespace-nowrap">Payment</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={()=>navigate("/products/")}
                               className="flex items-center p-2 text-black bg-yellow-100 rounded-r-[50px] hover:bg-yellow-200 group">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"/>
                                </svg>
                                <span className=" ms-3 whitespace-nowrap">Products</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={()=>navigate("/statistics/")}
                               className="bg-yellow-100 flex items-center p-2 text-black rounded-r-[50px] hover:bg-yellow-200 group">
                                <svg className="w-6 h-6 text-black dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
                                </svg>


                                <span className=" ms-3 whitespace-nowrap">Statistics</span>
                            </div>
                        </li>
                        <li onClick={() => setIsOpen(!isOpen)}
                            className="flex justify-between items-center bg-yellow-100 rounded-r-[50px] relative cursor-pointer hover:bg-yellow-200 p-2 rounded-lg">
                            <section className="flex gap-3 items-center">
                                <img className="size-8 rounded-full object-cover"
                                     src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                     alt="Rounded avatar"/>
                                <section className="text-left">
                                    <h4 className="text-md">{userName}</h4>
                                    {!userName&&<h4 className="text-md">None</h4>}
                                </section>
                            </section>
                            <div>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 9-7 7-7-7"/>
                                </svg>
                            </div>
                            {isOpen &&
                                <ul
                                    className="mt-1 absolute p-2 pl-0 left-0 right-0 top-full w-full bg-white shadow-lg rounded-sm">
                                    <li onClick={()=>{
                                        userId&&navigate("users/"+userId)
                                    }} className="mb-1">
                                        <a href="" className="px-2 py-1 hover:bg-gray-100 flex gap-3">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeWidth="2"
                                                      d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>


                                            Profile
                                        </a>
                                    </li>
                                    <li className="mb-1">
                                        <a href=""
                                           onClick={logout}
                                           className="px-2 py-1 hover:bg-gray-100 flex gap-3">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                                            </svg>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            }
                        </li>
                    </ul>
                </div>
            </aside>

            {/*<div className="p-4 sm:ml-64">*/}
            {/*    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">*/}
            {/*        <div className="grid grid-cols-3 gap-4 mb-4">*/}
            {/*            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">*/}
            {/*            <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
            {/*                     viewBox="0 0 18 18">*/}
            {/*                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                          strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                </svg>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="grid grid-cols-2 gap-4 mb-4">*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">*/}
            {/*            <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
            {/*                     viewBox="0 0 18 18">*/}
            {/*                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                          strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                </svg>*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div className="grid grid-cols-2 gap-4">*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"*/}
            {/*                         fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                              strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">*/}
            {/*                <p className="text-2xl text-gray-400 dark:text-gray-500">*/}
            {/*                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">*/}
            {/*                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>*/}
            {/*                    </svg>*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )
}