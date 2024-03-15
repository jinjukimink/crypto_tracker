import Router from "./Router";
import styled, { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from 'react-query/devtools';
//import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import {ThemeProvider} from "styled-components";
import { lightTheme,darkTheme } from './theme';
import { useState } from "react";

const GlobalStyle = createGlobalStyle`//글꼴
  @import url('https://fonts.googleapis.com/css2?family=Madimi+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nanum+Gothic&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap')
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Madimi One", sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color:${props=>props.theme.textColor};

  }
  a {
    text-decoration:none;//링크에 데코를 주지 않으려고
    color:inherit;
  }
`;

const AppContainer = styled.div`
  display: flex;
  //justify-content: flex-end;
  align-items: center;
  //height: 100vh; /* 화면 전체 높이에 맞게 설정 */
  padding-right: 20px; /* 오른쪽 여백 설정 */
`;

const BtnContainer=styled.div`
  margin-left: auto;
  display: fixed;
`
function App() {
  const [isDarkMode,setIsDarkMode]=useState(true);

  const toggle=()=>{
    setIsDarkMode(prev=>!prev);
  }

  return (
    <>
    <ThemeProvider theme={isDarkMode?lightTheme:darkTheme}>
    <GlobalStyle/>
          <BtnContainer>
          <button onClick={toggle}>{isDarkMode?"turn to light mode":"turn to dark mode"}</button>
          </BtnContainer>
      <Router/>

    <ReactQueryDevtools/>
    </ThemeProvider>
      </>
  );
}
export default App;

