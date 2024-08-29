export default function CartItem({name, price, quantity}) {
    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex gap-5">
                    <div className="w-[35%]">
                        <img src="../../public/ring.png" alt="image"/>
                    </div>
                    <section>
                        <h3 className="text-xl md:text-sm lg:text-lg">Product name</h3>
                        <h4 className="text-lg font-light md:text-sm lg:text-lg">Type</h4>
                        <h3 className="text-md font-serif ">Price</h3>
                    </section>
                </div>
                <div className="flex gap-2 mr-6">
                    <div><input type="text" value="0" className="size-14 md:size-10 lg:size-14 text-2xl text-center border border-black rounded-xl"/></div>
                    <div><input type="button" value="+" className="size-10 md:size-6 lg:size-10 bg-yellow-100 border rounded-[50px]"/></div>
                    <div><input type="button" value="-" className="size-10 md:size-6 lg:size-10 bg-yellow-100 border rounded-[50px]"/></div>
                </div>
            </div>
        </>
    )
}