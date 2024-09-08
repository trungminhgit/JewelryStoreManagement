import {VictoryChart, VictoryLine, VictoryBar, VictoryPie, VictoryArea, VictoryAxis, VictoryTheme} from 'victory';
import Sidebar from "../components/Sidebar.jsx";
import Cookies from "js-cookie";
import {authApi, endpoints} from "../helper/APIs.js";
import React, {useEffect} from "react";
import {createPath} from "react-router-dom";
import {toast} from "react-toastify";
import StatisticItem from "../components/StatisticItem.jsx";


const sales = {
    style: {
        data: {
            stroke: "#FB8833", // for Line chart
        },
        parent: { border: "1px solid #ccc"}
    },
    style2: {
        data: {
            fill: "#FB8833" // for Bar chart
        },
        parent: { border: "1px solid #ccc"}
    },
    data: [
        { x: "January", y: 21 },
        { x: "February", y: 35 },
        { x: "March", y: 75 },
        { x: "April", y: 51 },
        { x: "May", y: 41 },
        { x: "June", y: 47 }
    ]
};

const leads = {
    style: {
        data: {
            stroke: "#17A8F5", // for Line chart
        },
        parent: { border: "1px solid #ccc"}
    },
    style2: {
        data: {
            fill: "#17A8F5" // for Bar chart
        },
        parent: { border: "1px solid #ccc"}
    },
    data: [
        { x: "January", y: 41 },
        { x: "February", y: 79 },
        { x: "March", y: 57 },
        { x: "April", y: 47 },
        { x: "May", y: 63 },
        { x: "June", y: 71 }
    ]
};

export default function Statistic() {
    const [revenueQuarter1, setRevenueQuarter1] = React.useState(0)
    const [revenueQuarter2, setRevenueQuarter2] = React.useState(0)
    const [revenueQuarter3, setRevenueQuarter3] = React.useState(0)
    const [revenueQuarter4, setRevenueQuarter4] = React.useState(0)
    const [january, setJanuary] = React.useState(0)
    const [february, setFebruary] = React.useState(0)
    const [march, setMarch] = React.useState(0)
    const [april, setApril] = React.useState(0)
    const [may, setMay] = React.useState(0)
    const [june, setJune] = React.useState(0)
    const [july, setJuly] = React.useState(0)
    const [august, setAugust] = React.useState(0)
    const [september, setSeptember] = React.useState(0)
    const [october, setOctober] = React.useState(0)
    const [november, setNovember] = React.useState(0)
    const [december, setDecember]=React.useState(0)
    const [year,setYear]=React.useState(0)
    const [month, setMonth] = React.useState(0)
    const currentDate = new Date();






    const [revenueYear, setRevenueYear] = React.useState(0);
    const [revenueQuarter, setRevenueQuarter]= React.useState(0)
    const [revenueMonth, setRevenueMonth]=React.useState(0)
    const [revenueWeek, setRevenueWeek]=React.useState(0)
    const fetchRevenueYear = async (year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-year"](year))
        if(response.data.status===200){
            setRevenueYear(response.data.data)
        }
    }
    const fetchRevenueQuarter = async (quarter,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-quarter"](quarter,year))
        if(response.data.status===200){
            console.log("quarter",response.data)
            return response.data.data||0
        }
    }
    const fetchRevenueQuarter1 = async (quarter,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-quarter"](quarter,year))
        if(response.data.status===200){
            console.log("quarter",response.data)
            setRevenueQuarter(response.data.data||0)
        }
    }
    const fetchRevenueMonth = async (month,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-month"](month,year))
        if(response.data.status===200){
            return response.data.data||0
        }
    }
    const fetchRevenueMonth1 = async (month,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-month"](month,year))
        if(response.data.status===200){
            setRevenueMonth(response.data.data||0)
        }
    }
    const fetchRevenueWeek = async (week,year)=>{
        const token = Cookies.get("token")
        const response = await authApi(token).get(endpoints["revenue-by-week"](week,year))
        if(response.data.status===200){
            setRevenueWeek(response.data.data||0)
        }
    }
    const handleQuarter = async (year)=>{
        const quarter1Data = await fetchRevenueQuarter(1,year)
        setRevenueQuarter1(quarter1Data)
        const quarter2Data = await fetchRevenueQuarter(2,year)
        setRevenueQuarter2(quarter2Data)
        const quarter3Data = await fetchRevenueQuarter(3,year)
        setRevenueQuarter3(quarter3Data)
        const quarter4Data = await fetchRevenueQuarter(4,year)
        setRevenueQuarter4(quarter4Data)
    }
    handleQuarter(year)
    const handleMonth = async (year) => {
        const january = await fetchRevenueMonth(1,year)
        const february = await fetchRevenueMonth(2,year)
        const march = await fetchRevenueMonth(3,year)
        const april = await fetchRevenueMonth(4,year)
        const may = await fetchRevenueMonth(5,year)
        const june = await fetchRevenueMonth(6,year)
        const july = await fetchRevenueMonth(7,year)
        const august = await fetchRevenueMonth(8,year)
        const september = await fetchRevenueMonth(9, year)
        const october = await fetchRevenueMonth(10,year)
        const november = await fetchRevenueMonth(11,year)
        const december = await fetchRevenueMonth(12,year)
        setJanuary(january)
        setFebruary(february)
        setMarch(march)
        setApril(april)
        setMay(may)
        setJune(june)
        setJuly(july)
        setAugust(august)
        setSeptember(september)
        setOctober(october)
        setNovember(november)
        setDecember(december)
    }
    handleMonth(year)

    const dataLineChar = {
        style: {
            data:{
                stroke: "#333",
                fill:"rgb(253 246 178)",
            }
        },
        data:[
            {
                x: "1", y: january
            },{
                x: "2", y: february
            },{
                x: "3", y: march

            },{
                x: "4", y:april

            },{
                x: "5", y:may

            },{
                x: "6", y:june

            },{
                x: "7", y:july

            },{
                x: "8", y: august

            },{
                x: "9", y:  september

            },{
                x: "10", y: october

            },{
                x: "11", y:november
            },{
                x: "12", y:december
            }

        ]


    }
    console.log(dataLineChar)
    const dataPieChar = {
        style: {
            data:{
                stroke: "#333",

            }
        },
        data:[
            {
                x: "Quarter 1", y: revenueQuarter1
            },{
                x: "Quarter 2", y: revenueQuarter2
            },{
                x: "Quarter 3", y: revenueQuarter3
            },{
                x: "Quarter 4", y:revenueQuarter4

            }
        ]


    }
    useEffect(() => {
        setYear(currentDate.getFullYear())
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth()+1;
        let quarter = (currentDate.getMonth()+1)/3
        function getWeekOfMonth(date) {
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // First day of the month
            const dayOfMonth = date.getDate(); // Current day of the month
            const startDayOfWeek = startOfMonth.getDay(); // Day of the week the month starts (0 = Sunday, 6 = Saturday)

            // Calculate the week number
            const adjustedDate = dayOfMonth + startDayOfWeek;
            const weekNumber = Math.ceil(adjustedDate / 7);

            return weekNumber;
        }
        const week = getWeekOfMonth(currentDate);
        fetchRevenueYear(year)
        fetchRevenueQuarter1(quarter,year)
        fetchRevenueMonth(month,year)
        fetchRevenueWeek(week,year)
    }, [])

    return (
        <>
            <Sidebar/>
            <main className="h-fit p-4 sm:ml-64 bg-gray-100">

                <section className="p-4">
                    <h1 className="text-4xl mb-4">Revenue Statistic</h1>
                    <div className="flex flex-wrap gap-4 w-full mb-8">
                        <StatisticItem title="revenue year" data={revenueYear}/><StatisticItem title="revenue quarter"
                                                                                               data={revenueQuarter}/>
                        <StatisticItem title="revenue month" data={revenueMonth}/><StatisticItem title="revenue week"
                                                                                                 data={revenueWeek}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="year">Select year</label>
                        <select id="year" defaultValue={year} className="block mt-3" value={year}
                                onChange={(e) => setYear(e.target.value)}>
                            <option selected={true}>Select year</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <div className="size-1/2 mx-auto">
                        <VictoryChart
                            width={450}
                            height={250}
                        >
                            <VictoryArea
                                data={dataLineChar.data}
                                style={dataLineChar.style}
                            />

                        </VictoryChart>
                    </div>
                    <h2 className="text-2xl mb-4 text-center">Revenue by month</h2>
                    <div className="mb-4">
                        <label htmlFor="year">Select year</label>
                        <select id="year" className="block mt-3" value={year}
                                onChange={(e) => setYear(e.target.value)}>
                            <option selected={true}>Select year</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <div className="size-1/2 mx-auto">
                        <VictoryPie
                            colorScale={['rgb(253 246 178)', '#333']}
                            width={500}
                            data={dataPieChar.data}
                            style={dataPieChar.style}
                        />
                    </div>
                    <h2 className="text-2xl mb-4 text-center">Revenue by quarter</h2>
                </section>
            </main>

        </>
    )
}