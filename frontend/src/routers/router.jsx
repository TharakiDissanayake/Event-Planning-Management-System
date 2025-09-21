import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../window/staff/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/staff/home",
                element: <Home/>
            },
            {
                path: "/staff/add-customer",
                element: <h1>Add Customer</h1>
            },
            {
                path: "staff/add-event",
                element: <h1>Add Event</h1>
            }
        ]
    }
]);

export default router;