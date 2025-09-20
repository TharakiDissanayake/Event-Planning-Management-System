import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";

const router = createBrowserRouter([
    {
    path: "/login",
    element: <Login />,
    },

    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <h1>Login Page</h1>
            },
            {
                path: "admin",
                element: <h1>Admin Page</h1>
            },
            {
                path: "staff",
                element: <h1>Staff Page</h1>
            }
        ]
    }
]);

export default router;