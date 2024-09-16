
import CurrencyFormat from 'react-currency-format'

export default function StatisticItem({title, data}) {
    return (
        <>
            <section className="bg-black p-4 py-10 flex gap-5 rounded-md">
                <div className="rounded-md self-end bg-gray-100 text-left px-4 py-1 basis-[70%]">
                    {title}
                </div>
                <div className="rounded-md bg-gray-100 p-4 text-3xl basis-[30%]">
                    <CurrencyFormat renderText={(value)=><div>{value}&nbsp;đ</div>} value={data} thousandSeparator={true} displayType={'text'}/>
                 </div>
            </section>
        </>
    )
}