import { useOutletContext } from "react-router";//부모 컴포넌트에서 props를 받아오려고
import { useQuery } from "react-query";
import { fetchCoinHistroy } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

export interface IChartProps{
    coinId:string;
}
export interface IHistoryData{  
    time_open: number;
    time_close:number;
    open:string;//시가
    high:string;//
    low:string;
    close:string;//종가
    volume:string;
    market_cap:number;
}

function Chart(){
    const {coinId}=useOutletContext<IChartProps>();
    //console.log(coinId);
    const{isLoading: historyLoading ,data:historyData} = useQuery<IHistoryData[]>(["history",coinId],()=>fetchCoinHistroy(coinId));
    //console.log(historyData);
    const isDark=useRecoilValue(isDarkAtom);

    if(historyLoading||!historyData){
        return <div>Loading chart...</div>
    }
    return (
        <div>{historyLoading?"Loading chart...":<ApexChart 
        type="candlestick"
        series={[ 
            {
                name:"price",
                data: historyData.map((price,index) =>({
                    x:new Date(price.time_open).getTime(),
                    y:[
                        parseFloat(price.open),
                        parseFloat(price.high),
                        parseFloat(price.low),
                        parseFloat(price.close),
                    ]
                }))||[]
            },
        ]} 
        options={{
            theme:{
                mode:isDark? "dark":"light",
            },
            chart:{
            height:300,
            width:500,
            toolbar:{
                show:false,
            },
            background:"transparent",
            },
            stroke:{
                curve:"smooth",
                width:3,
            },
            grid:{
                show:false,
            },
            yaxis:{
                show:false,
            },
            xaxis:{
                labels:{
                    show:false,
                },
                axisTicks:{
                    show:false,
                },
                axisBorder:{
                    show:false,
                },
                categories:historyData?.map(price =>Number(price.time_close))as number[], 
                type:"datetime",
                
            },
            fill:{
                type:"gradient",
                gradient:{gradientToColors:["#0be881"], stops:[0,100]},
            },
            colors:["#0fbcf9"],
            tooltip:{
                y:{
                    formatter:(value)=>`$ ${value.toFixed(3)}`
                }

            }
        }
            
        }/>}</div>
    );
}

export default Chart;