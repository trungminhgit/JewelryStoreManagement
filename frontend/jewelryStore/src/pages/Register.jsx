export default function Register() {
    return (
        <>
            <section className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <img className="mx-auto" src="../../public/logo.png" alt="logo" />
                <div className="mt-4">
                    <div className="bg-gradient-to-t from-yellow-300 to-purple-400 p-0.5 rounded-md">
                        <div className="bg-white p-4 rounded-md">
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="username">Username</label>
                                <input type="input" id="username" className="w-full border border-black p-4 rounded-md"
                                       placeholder="Username"/>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 inline-block" htmlFor="password">Password</label>
                                <input type="password" id="password"
                                       className="w-full border border-black p-4 rounded-md"
                                       placeholder="Username"/>
                            </div>
                            <div className="mb-4 flex gap-4">
                                <button className="bg-yellow-300 text-white px-4 py-2 rounded-md">Sign in</button>
                                <button className="bg-white border border-black text-black px-4 py-2 rounded-md">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}