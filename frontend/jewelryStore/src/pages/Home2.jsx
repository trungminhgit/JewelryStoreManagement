import NavBar from "../components/NavBar.jsx";
import CardSpecialProduct from "../components/CardSpecialProduct.jsx";
import CardProduct from "../components/CardProduct.jsx";
import {useContext} from "react";
import {cartContext} from "../helper/Context.js";

export default function Home2(){

    return (
        <>
            <NavBar/>
            <section className="md:mx-auto w-full md:p-0 md:w-[80%]">
                <div className="p-20 py-11 flex justify-between bg-purple-400">
                    <div className="flex flex-col justify-between">
                        <div className="text-white">
                            <h2 className="text-4xl">ASDASd</h2>
                            <h3 className="text-3xl">asd</h3>
                        </div>
                        <div>
                            <button className="bg-yellow-100 rounded-md text-black py-3 px-8 text-xl">Mua</button>
                        </div>
                    </div>

                    <div>
                        <img src="../../public/ring.png" className="" alt="logo"/>
                    </div>
                </div>
                <h2 className="text-4xl text-center my-12">New Products</h2>
                <div className="flex gap-6 w-2/3 mx-auto mb-20 overflow-x-auto">
                    <CardSpecialProduct name="asdasd" subname="asdasd"/>
                    <CardSpecialProduct name="asdasd" subname="asdaasd"/>
                    <CardSpecialProduct name="asdasd" subname="asdasd"/>
                </div>
                <h2 className="text-4xl text-center mt-8 mb-14">Products</h2>
                <div className="flex gap-8 flex-wrap justify-center mb-16">
                    <CardProduct id={1} imageUrl="../../public/ring.png" name="asd" subname="asdd"/>
                    <CardProduct id={2} imageUrl="../../public/ring.png" name="asd" subname="asdd"/>
                    <CardProduct id={3} imageUrl="../../public/ring.png" name="asd" subname="asdd"/>
                    <CardProduct id={4} imageUrl="../../public/ring.png" name="asd" subname="asdd"/>
                </div>
            </section>
            <footer className="text-left p-3 bg-purple-400 text-white">ASDASD</footer>

        </>
    )
}