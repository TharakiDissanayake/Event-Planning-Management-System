import EventCard from "./components/EventCard";
import Sidebar from "./components/SideBar";
import eventimg from "./assets/images/event-image.jpg";
import { useEffect, useState } from "react";

function App() {
  // const [role, setRole] = useState(null);

  // useEffect(() => {
  //   const storedRole = localStorage.getItem("userRole");
  //   setRole(storedRole); // "admin" or "staff"
  // }, []);

  // if (!role) return null; // or a loading spinner

  return (
    <div className="flex">
      <Sidebar role="staff"/>
      <EventCard 
        image={eventimg}
        title="Event Title" 
        description="Full service with catering, music, and decorations." 
        date={"2024-12-31"}
        onClick={() => {}}/>
    </div>
  )
}
export default App;
