export default function CardSpecialProduct({name, subname}) {
    return (
        <>
            <div className="flex flex-col">
                <div className="p-7 pb-20 bg-black text-white">
                    <h3 className="text-4xl">{name}</h3>
                    <p className="text-2xl">{subname}</p>
                </div>
                <div className="">
                    <img src="../../public/ring.png" alt="image"/>
                </div>
            </div>
        </>
    )
}