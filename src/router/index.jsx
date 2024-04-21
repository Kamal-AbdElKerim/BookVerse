import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Layout from "../layout/layout";
import MoreInfo from "../components/MoreInfo_Book/MoreInfo";



export const router = createBrowserRouter([
    {
       
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/More/Info/:id",
                element: <MoreInfo />,
            },
       
            {
                path: "*",
                element: <h1>no data</h1>,
            },
        ]
            
    }
   
]);
