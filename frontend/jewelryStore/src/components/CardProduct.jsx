export default function CardProduct({name, subname}) {
    return (
        <>
            <div className="px-8 py-6 bg-purple-400 text-white rounded-lg max-w-[400px]">
                <div>
                    <img src="../../public/ring.png" alt="image" className="object-cover" />
                </div>
                <div className="my-4">
                    <h3 className="text-4xl">{name}</h3>
                    <h4 className="text-xl font-light">{subname}</h4>
                </div>
                <p className="text-wrap break-all block">
                    paragraphparagraphparagraphparagraphparagraphparagraphparagraphparagraphparagraph
                </p>
                <button className="bg-yellow-400 px-4 py-2 text-white rounded-md mt-8">Mua</button>
            </div>
        </>
    )
}