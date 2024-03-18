import styled from "styled-components";
import { Link } from "react-router-dom";
//import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";


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

const CoinsList=styled.ul``;

const Coin=styled.li`
    background-color: ${props=>props.theme.containColor};
    color:${props=>props.theme.bgColor};
    padding: 20px; 
    border-radius: 15px; //1px black;
    margin-bottom:10px ;
    
    a{
        //display: block;
        padding:20px;
        transition: color 0.2s ease-in;
        align-items: center;
        display: flex;
    }
    &:hover{
        a{
            color:${props=>props.theme.accentColor};
        }

    }
`;

const Title=styled.h1`
    font-size:48px ;
    color:${props=>props.theme.accentColor};
`;

const LoadingBox=styled.div`
    text-align: center;
    `;

const ImgBox=styled.img`
    width:25px;
    height: 25px;
    margin-right: 10px;

`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
} 


function Coins(){//토글 함수를 받아옴.
    const setMode=useSetRecoilState(isDarkAtom);

    const {isLoading, data}=useQuery<ICoin[]>("coinsList",fetchCoins);
    return(
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header> 
                <Title>코인</Title>
                <button onClick={()=> setMode(prev=>!prev)}>toggle mode</button>
            </Header>
            {isLoading?<LoadingBox>Loading...</LoadingBox>:<CoinsList>
                {data?.slice(0,50).map((coin:ICoin)=>
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={coin.name}>
                    <ImgBox src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt="코인이미지"/>
                    {coin.name} &rarr;
                    </Link>
                </Coin>
                )}
            </CoinsList>}
        </Container>
    );
}
export default Coins;