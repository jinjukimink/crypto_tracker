import ReactDOM from 'react-dom/client';
//import { lightTheme,darkTheme } from './theme';
import App from './App';
//import { ThemeProvider } from 'styled-components';
import {QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";

const queryClient=new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <>
    <RecoilRoot> 
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </RecoilRoot> 


    </>
);
