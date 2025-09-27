import { createBrowserRouter, Navigate } from "react-router-dom";
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
import ViewCalendar from "../window/staff/ViewCalendar";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" replace />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/staff/home",
                element: <ProtectedRoute requiredRole="STAFF"><Home /></ProtectedRoute>
            },
            {
                path: "/staff/view-calendar",
                element: <ProtectedRoute requiredRole="STAFF"><ViewCalendar /></ProtectedRoute>
            },
            {
                path: "/staff/add-customer",
                element: <ProtectedRoute requiredRole="STAFF"><AddCustomer /></ProtectedRoute>
            },
            {
                path: "/staff/add-event",
                element: <ProtectedRoute requiredRole="STAFF"><AddEvent /></ProtectedRoute>
            },
            {
                path: "/staff/check-customer",
                element: <ProtectedRoute requiredRole="STAFF"><CheckCustomer /></ProtectedRoute>
            },
            {
                path: "/staff/view-packages",
                element: <ProtectedRoute requiredRole="STAFF"><ViewPackages /></ProtectedRoute>
            },
            {
                path: "/staff/view-offers",
                element: <ProtectedRoute requiredRole="STAFF"><ViewOffers /></ProtectedRoute>
            },
            {
                path: "/admin/home",
                element: <ProtectedRoute requiredRole="ADMIN"><Home /></ProtectedRoute>
            },
            {
                path: "/admin/view-calendar",
                element: <ProtectedRoute requiredRole="ADMIN"><ViewCalendar /></ProtectedRoute>
            },
            {
                path: "/admin/add-customer",
                element: <ProtectedRoute requiredRole="ADMIN"><AddCustomer /></ProtectedRoute>
            },
            {
                path: "/admin/add-event",
                element: <ProtectedRoute requiredRole="ADMIN"><AddEvent /></ProtectedRoute>
            },
            {
                path: "/admin/check-customer",
                element: <ProtectedRoute requiredRole="ADMIN"><CheckCustomer /></ProtectedRoute>
            },
            {
                path: "/admin/view-packages",
                element: <ProtectedRoute requiredRole="ADMIN"><ViewPackages /></ProtectedRoute>
            },
            {
                path: "/admin/view-offers",
                element: <ProtectedRoute requiredRole="ADMIN"><ViewOffers /></ProtectedRoute>
            },
            {
                path: "/admin/add-packages",
                element: <ProtectedRoute requiredRole="ADMIN"><AddPackages /></ProtectedRoute>
            },
            {
                path: "/admin/add-offers",
                element: <ProtectedRoute requiredRole="ADMIN"><AddOffers /></ProtectedRoute>
            },
        ]
    }
]);

export default router;