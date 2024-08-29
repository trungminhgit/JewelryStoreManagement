import NavBar from "../components/NavBar.jsx";
import {useState} from "react";
import Footer from "../components/Footer.jsx";

export default function DetailProduct2() {
    const [quantity, setQuantity] = useState(0);
    return (
        <>
            <NavBar/>
            <section className="mx-auto w-[80%]">
                <h3 className="my-4 text-3xl">Chi tiet san pham</h3>

                <section className="flex gap-4 flex-col md:flex-row">
                    <img className="basis-1/2" src="../../public/ring.png" alt="img"/>
                    <section className="basis-1/2">
                        <h4 className="mb-2">Ten san pham</h4>
                        <h3 className="mb-2">Loai san pham</h3>
                        <p className="mb-2">Mo ta san phamMo ta san phamMo ta san phamMo ta san phamMo ta san phamMo ta
                            san phamMo ta san phamMo ta san pham</p>
                        <div className="flex gap-4 items-center">
                            <input type="text" value={quantity} className="p-4 rounded-md size-12 text-2xl"/>
                            <input type="button" className="rounded-full bg-yellow-300 size-10" value="+" onClick={()=>setQuantity(quantity+1)}/>
                            <input type="button" className="rounded-full bg-yellow-300 size-10" value="-" onClick={()=>setQuantity(quantity-1<0?0:quantity-1)}/>
                        </div>
                        <button className="mt-10 px-4 py-2 bg-yellow-300 rounded-md">Mua</button>
                    </section>
                </section>
            </section>
            <Footer/>

        </>
    )
}