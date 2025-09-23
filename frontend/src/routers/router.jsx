import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Home from "../window/staff/Home";
import ViewPackages from "../window/staff/ViewPackages";
import ViewOffers from "../window/staff/ViewOffers";
import AddPackages from "../window/admin/AddPackages";

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
                path: "/staff/add-event",
                element: <h1>Add Event</h1>
            },
            {
                path: "/staff/check-customer",
                element: <h1>Check Customer</h1>
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
                element: <h1>Add Offers</h1>
            },
        ]
    }
]);

export default router;