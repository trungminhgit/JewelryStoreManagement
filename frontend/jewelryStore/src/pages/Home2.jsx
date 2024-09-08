import NavBar from "../components/NavBar.jsx";
import CardSpecialProduct from "../components/CardSpecialProduct.jsx";
import CardProduct from "../components/CardProduct.jsx";
import {useContext, useEffect, useState} from "react";
import {cartContext} from "../helper/Context.js";
import Cookies from "js-cookie";
import {authApi, endpoints} from "../helper/APIs.js";
import {useNavigate} from "react-router-dom";

export default function Home2(){
    const [prouducts, setProducts] = useState([])
    const fetchProducts = async () => {
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["products"](0))
        console.log(response.data.data.items)
        setProducts(response.data.data.items);
    }
    const navigate = useNavigate()
    useEffect(() => {
        fetchProducts()
    },[])

    return (
        <>
            <NavBar/>
            <section className="md:mx-auto w-full md:p-0 md:w-[80%]">
                <div className="p-20 py-11 flex justify-between bg-purple-400">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-white">
                            <h2 className="text-4xl mb-2">Têm sảm phẩm A</h2>
                            <h3 className="text-3xl">Loại sản phẩm A</h3>
                        </div>
                    </div>

                    <div>
                        <img src="../../public/ring.png" className="" alt="logo"/>
                    </div>
                </div>
                <h2 className="text-4xl text-center my-12">Products</h2>
                <div className="flex gap-6 w-2/3 mx-auto mb-20 scrollbar pb-8 overflow-x-auto">
                    {prouducts.map(((p,index)=>{
                        if(index <= 2){

                            return <div className="cursor-pointer" onClick={()=>navigate("/products-client/"+p.productID)}>
                                <CardSpecialProduct key={p.productID} name={p.productName} subname={p.categoryName} imgUrl={p.productImage}/>
                            </div>
                        }
                    }))}

                </div>
                <h2 className="text-4xl text-center mt-8 mb-14">Products</h2>
                <div className="flex gap-x-2 gap-y-4 flex-wrap justify-center">
                    {prouducts.map(p=>{
                        return <div className="cursor-pointer" onClick={()=>navigate("/products-client/"+p.productID)}>
                            <CardProduct key={p.productID} id={p.productID} name={p.productName} subname={p.categoryName} imageUrl={p.productImage}/>
                        </div>
                    })}

                </div>
            </section>
            <footer className="text-left p-3 bg-purple-400 text-white">ASDASD</footer>

        </>
    )
}