import Sidebar from "../components/Sidebar.jsx";
import React from "react";
import StatisticItem from "../components/StatisticItem.jsx";

export default function Home() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
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
                    <div className="flex justify-between">
                        <div>
                            <input type="text" className="p-3 border border-black rounded-md text-lg"
                                   placeholder="keyword"/>
                            <button className="ml-3 bg-purple-500 p-3 text-white rounded-md text-lg">Search</button>
                        </div>
                        <div>
                            <button className="bg-purple-500 p-3 text-white rounded-md text-lg">Add</button>
                        </div>
                    </div>
                    <table className="mx-auto">
                        <thead>
                        <tr>
                            <th className="p-2 px-10 text-xl text-left border-8 border-white bg-black text-white">Id</th>
                            <th className="p-2 px-10  border-8  text-xl text-left border-white bg-black text-white">sad</th>
                            <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">sad</th>
                            <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">sad</th>
                            <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white">sad</th>
                            <th className="p-2 px-10 border-8 text-xl text-left border-white bg-black text-white"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                asd
                            </td>
                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                asd
                            </td>
                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                asd
                            </td>
                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                asd
                            </td>
                            <td className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white">
                                asd
                            </td>
                            <td onClick={() => setOpen(!open)}
                                className="p-2 px-10 border-8 text-xl text-left border-white bg-purple-500 text-white relative">
                                <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                          d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                                </svg>
                                {open && <div
                                    className="bg-white cursor-pointer border border-black absolute top-100 z-20 -left-100 right-0 min-w-[100px] py-2 rounded-md shadow-md">
                                    <p className="py-2 px-4 text-black hover:bg-gray-100 hover:text-black">Edit</p>
                                    <p className="py-2 px-4 text-black hover:bg-gray-100 hover:text-black">Delete</p>
                                </div>}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-center gap-2">
                        <div className="p-3 bg-black text-white rounded-md">
                            <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
                            </svg>

                        </div>
                        <div className="p-3 bg-black text-white rounded-md">1</div>
                        <div className="p-3 bg-black text-white rounded-md">2</div>
                        <div className="p-3 bg-black text-white rounded-md">3</div>
                        <div className="p-3 bg-black text-white rounded-md">
                            <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                            </svg>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}