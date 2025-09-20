import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar";
import { useEffect, useState } from "react";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole); // "admin" or "staff"
  }, []);

  if (!role) return null; // or a loading spinner

  return (
    <div className="flex">
      <Sidebar role={role}/>
      {/* <main>
        <Outlet/>
      </main> */}
    </div>
  )
}
export default App;
