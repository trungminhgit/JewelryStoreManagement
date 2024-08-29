import NavBar from "../components/NavBar.jsx";
import CartItem from "../components/CartItem.jsx";

export default function Cart() {
    return (
        <>
            <NavBar />
            <section className="md:mx-auto w-full md:p-0 md:w-[80%]">
                <h3 className="mb-12 mt-7 text-4xl ml-4 lg:ml-0">Cart page</h3>
                <div className="flex flex-col md:flex-row gap-0 lg:gap-16">
                    <div className="flex flex-col w-full lg:w-2/3 p-4">
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                    </div>
                    <div className="bg-black text-white w-full md:w-1/3">
                        <div className="p-3 bg-black rounded-md">
                           <h4>asdasdasd</h4>
                        </div>
                        <div className="bg-white h-[80%] text-black">
                            <div className="py-10 pl-5 pr-16">
                                <div className="text-black mb-3">
                                    <h4 className="font-normal text-xl md:text-md lg:text-xl">Product name:&nbsp;<span>Product name</span>
                                    </h4>
                                    <p className="font-light">Quantity:<span>3</span></p>
                                </div>
                                <div className="text-black">
                                    <h4 className="font-normal text-xl md:text-md lg:text-xl">Product name:&nbsp;<span>Product name</span>
                                    </h4>
                                    <p className="font-light">Quantity:<span>3</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-md bg-black">
                            <h4>asdasd</h4>
                            <button className="bg-yellow-100 text-xl text-black px-4 py-1 rounded-md">ASda</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}