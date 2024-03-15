import { BrowserRouter,Routes,Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import { Link } from "react-router-dom";
import styled from "styled-components";



const LinkContainer = styled.div`
  position:fixed;
  left: 10px;
  top:40px;
  z-index: 999;
`;

function Router(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Coins/>}/>
            <Route path="/:coinId" element={<Coin/>}>
                <Route path="price" element={<Price/>}/>
                <Route path="chart" element={<Chart/>}/>
            </Route>
        </Routes>
  
        <LinkContainer>
        <Link to="/"> &larr; 홈화면으로 가기</Link>
      </LinkContainer>

        </BrowserRouter>

    );
    
}
export default Router;