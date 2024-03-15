const BASE_URL=`https://api.coinpaprika.com/v1`;

export async function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then(response=> (response).json());
} 

export async function fetchInfoData(coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response=>response.json());
} 
export async function fetchPriceData(coinId:string) {
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(response=>response.json());
} 

export async function fetchCoinHistroy(coinId:string){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`).then(response=>response.json());
}