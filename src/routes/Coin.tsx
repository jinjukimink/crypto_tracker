//import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams,useLocation, Outlet,Link,useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchInfoData, fetchPriceData } from "../api";
//import { useOutletContext } from "react-router-dom";
import {Helmet} from "react-helmet";


const Container=styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`
;
const Header=styled.header`
    height:10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;


const LoadingBox=styled.div`
    text-align: center;
    `;

const Title=styled.h1`
    font-size:48px ;
    color:${props=>props.theme.accentColor};
`;
interface IState{
    name: string;
} 

interface IInfoData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    is_new:boolean;
    is_active:boolean;
    type:string;
    contract:string;
    platform:string;
    contracts:object;
    logo:string;
    parent:object;
    //tags:ITag[];
    //team:object;
    description:string;
    message:string;
    open_source:boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    links:object;
    links_extended:object;
    whitepaper:object;
    first_data_at:string;
    last_data_at:string;
}

interface IPriceData{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{
        ath_date: string
        ath_price: number
        market_cap:number
        market_cap_change_24h:number
        percent_change_1h :number
        percent_change_1y:number
        percent_change_6h :number
        percent_change_7d:number
        percent_change_12h:number
        percent_change_15m:number
        percent_change_24:number
        percent_change_30d:number
        percent_change_30m:number
        percent_from_price_ath:number
        price:number
        volume_24h:number
        volume_24h_change_24h:number
    };
}
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;


const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

function Coin(){
    const {coinId}=useParams<string>();

    const location=useLocation();//이렇게 해서 Coins에서 주는 정보를 받은거임

    const priceMatch = useMatch("/:coinId/price"); 
    const chartMatch = useMatch("/:coinId/chart");

    const{isLoading:infoLoading,data:infoData}=useQuery<IInfoData>(["info",coinId],()=>fetchInfoData(coinId!));
    const{isLoading:priceLoading,data:priceData}=useQuery<IPriceData>(["price",coinId],()=>fetchPriceData(coinId!),
    {
        //refetchInterval:5000,//새로고침마다 refresh되기 위해 refetch함
    });
    console.log(priceData);
    const loading=infoLoading||priceLoading;
    return(
        <Container>
            <Helmet>
                <title>{location?.state ? location.state : loading? "Loading...":infoData?.name}</title>
            </Helmet>
            <Header>
                <Title>
                    {location?.state ? location.state : loading? "Loading...":infoData?.name}
                </Title>
            </Header>
            {loading?<LoadingBox>Loading...</LoadingBox>:(
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>${infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Price:</span>
                        <span>{priceData?.quotes.USD.ath_price.toFixed(2)}</span>
                    </OverviewItem>
                </Overview>
                <Description>{infoData?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{priceData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{priceData?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                </>
            )}      
            <Tabs>
                <Tab isActive={chartMatch!==null}>
                {/* <Link to={`${coinId}/chart`}>Chart</Link> */}
                <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
                <Tab isActive={priceMatch!==null}>
                <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
            </Tabs>
            <Outlet context={{coinId}}/> 
            </Container>
            );
}
export default Coin;

