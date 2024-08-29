import NavBar from "../components/NavBar.jsx";
import CardProduct from "../components/CardProduct.jsx";
import Footer from "../components/Footer.jsx";

export default function Products2() {
    return (
        <>
            <NavBar/>
            <main className="w-[80%] mx-auto">
                <h1 className="mb-8 text-4xl mt-8">Danh sach san pham</h1>
                <div className="flex gap-2">
                    <input type="text" placeholder="Enter keyword" className="text-md px-4 py-2 bg-white border border-black rounded-md"/>
                    <button className="px-4 py-2 rounded-md bg-purple-400 text-white">Search</button>
                </div>

                <div className="flex gap-8 flex-wrap mt-8">
                    <CardProduct name="asdsd" subname="ASDASD"/>
                    <CardProduct name="asdsd" subname="ASDASD"/>
                    <CardProduct name="asdsd" subname="ASDASD"/>
                    <CardProduct name="asdsd" subname="ASDASD"/>
                    <CardProduct name="asdsd" subname="ASDASD"/>
                </div>
            </main>
            <Footer/>
        </>
    )
}