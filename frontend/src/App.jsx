import Sidebar from "./components/SideBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
