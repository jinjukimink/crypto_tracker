import ReactDOM from 'react-dom/client';
//import { lightTheme,darkTheme } from './theme';
import App from './App';
//import { ThemeProvider } from 'styled-components';
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient=new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <>
    <QueryClientProvider client={queryClient}>
    
    <App />
    
    </QueryClientProvider>

    </>
);
