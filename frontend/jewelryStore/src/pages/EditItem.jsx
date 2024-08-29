import Sidebar from "../components/Sidebar.jsx";
import React from "react";

export default function EditItem() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Sidebar />
            <main className="h-screen p-4 sm:ml-64 bg-gray-100">
                <section className="p-4">
                    <section className="mb-8">
                        <h1 className="text-4xl">Tiêu đề</h1>
                    </section>
                    <section className="w-1/2">
                        <div className="mb-4">
                            <label>Label 1</label>
                            <input type="text" className="p-3 rounded-md border bg-gray-100 border-black w-full"/>
                        </div>
                        <div className="mb-4">
                            <label>Label 1</label>
                            <input type="text" className="p-3 bg-gray-100 rounded-md border border-black w-full"/>
                        </div>
                        <div className="mb-4">
                            <label>Label 1</label>
                            <input type="text" className="p-3 rounded-md bg-gray-100 border border-black w-full"/>
                        </div>
                        <img src="../../public/logo.png"/>
                        <div className="mb-8">
                            <input type="file" className="p-3 rounded-md"/>
                        </div>
                        <div className="mb-4 flex gap-2">
                            <input type="button" value="Update"
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