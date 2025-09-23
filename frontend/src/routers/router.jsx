import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../window/staff/Home";
import ViewPackages from "../window/staff/ViewPackages";
import ViewOffers from "../window/staff/ViewOffers";
import AddPackages from "../window/admin/AddPackages";
import AddOffers from "../window/admin/AddOffers";
import AddCustomer from "../window/staff/AddCustomer";
import AddEvent from "../window/staff/AddEvent";
import CheckCustomer from "../window/staff/CheckCustomer";

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
                element: <AddCustomer/>
            },
            {
                path: "/staff/add-event",
                element: <AddEvent/>
            },
            {
                path: "/staff/check-customer",
                element: <CheckCustomer/>
            },
            {
                path: "/staff/view-packages",
                element: <ViewPackages/>
            },
            {
                path: "/staff/view-offers",
                element: <ViewOffers />
            },
            {
                path: "/admin/home",
                element: <Home />
            },
            {
                path: "/admin/add-customer",
                element: <AddCustomer/>
            },
            {
                path: "/admin/add-event",
                element: <AddEvent/>
            },
             {
                path: "/admin/check-customer",
                element: <CheckCustomer/>
            },
            {
                path: "/admin/view-packages",
                element: <ViewPackages/>
            },
            {
                path: "/admin/view-offers",
                element: <ViewOffers />
            },
            {
                path: "/admin/add-packages",
                element: <AddPackages />
            },
            {
                path: "/admin/add-offers",
                element: <AddOffers/>
            },
        ]
    }
]);

export default router;