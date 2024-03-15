import { useOutletContext } from "react-router";
import { IChartProps } from "./Chart";
import { IHistoryData } from "./Chart";
import { fetchCoinHistroy } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

function Price(){
    const {coinId}=useOutletContext<IChartProps>();
    //console.log(coinId);
    const{isLoading: historyLoading ,data:historyData} = useQuery<IHistoryData[]>(["history",coinId],()=>fetchCoinHistroy(coinId));
    console.log(historyData);
    return (
        <div>{historyLoading?"Loading chart...":<ApexChart 
        type="line"
        series={[ 
            {
                name: "price",
                data: historyData?.map(price =>Number(price.close))as number[],
            },
        ]} 
        options={{
            theme:{
                mode:"dark",
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
export default Price;