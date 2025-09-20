import EventCard from "./components/EventCard";
import Sidebar from "./components/SideBar";
import eventimg from "./assets/images/event-image.jpg";
import PackageCard from "./components/PackageCard";
import packageimg from "./assets/images/package-image.png";
import OfferCard from "./components/OfferCard";
import offerimg from "./assets/images/offer-image.jpg";
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
      <PackageCard
        image={packageimg}
        title="Package Title"
        description="A comprehensive package including venue, catering, and entertainment."
        startDate={"2024-12-01"}
        endDate={"2024-12-31"}
        onClick={() => {}}
      />
      <OfferCard
        image={offerimg}
        title="Special Offer"
        description="Limited time offer on event packages."
        startDate={"2024-11-01"}
        endDate={"2024-11-30"}
        onClick={() => {}}
      />
    </div>
  )
}
export default App;
