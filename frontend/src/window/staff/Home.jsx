import { useState } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import EventCard from "../../components/EventCard";
import chatbot from "../../assets/icons/chatbot.gif"
import CardContainer from "../../components/CardContainer";
import EventDetailPopup from "../../components/EventDetailPopup";

// Example event data
const events = [
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+1",
        title: "Annual Gala",
        description: "A grand celebration with dinner, music, and awards.",
        date: "2025-10-15",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+2",
        title: "Team Building",
        description: "Fun activities to strengthen team spirit.",
        date: "2025-11-02",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+3",
        title: "Product Launch",
        description: "Introducing our latest product to the market.",
        date: "2025-12-01",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+1",
        title: "Annual Gala",
        description: "A grand celebration with dinner, music, and awards.",
        date: "2025-10-15",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+2",
        title: "Team Building",
        description: "Fun activities to strengthen team spirit.",
        date: "2025-11-02",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+3",
        title: "Product Launch",
        description: "Introducing our latest product to the market.",
        date: "2025-12-01",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+1",
        title: "Annual Gala",
        description: "A grand celebration with dinner, music, and awards.",
        date: "2025-10-15",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+2",
        title: "Team Building",
        description: "Fun activities to strengthen team spirit.",
        date: "2025-11-02",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+3",
        title: "Product Launch",
        description: "Introducing our latest product to the market.",
        date: "2025-12-01",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+1",
        title: "Annual Gala",
        description: "A grand celebration with dinner, music, and awards.",
        date: "2025-10-15",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+2",
        title: "Team Building",
        description: "Fun activities to strengthen team spirit.",
        date: "2025-11-02",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+3",
        title: "Product Launch",
        description: "Introducing our latest product to the market.",
        date: "2025-12-01",
    },
];

const Home = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Handle card click to open popup
    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setPopupOpen(true);
    };

    // Map event data for popup
    const getPopupData = (event) => ({
        customerId: "EV001",
        customerName: "John Doe",
        eventType: event.title,
        eventDate: event.date,
        status: "Confirmed",
        image: event.image,
    });

    return (
        <div>
            <div className="flex">
                <Sidebar role="staff" />
                <div className="flex-1 p-4 relative">
                    {/* Company Logo - top right */}
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="absolute top-4 right-6 w-24 h-auto z-20"
                    />
                    <h1 className="text-5xl font-bold text-primary mb-6 mt-10 ml-6 drop-shadow-lg">
                        Upcoming Events
                    </h1>
                    {/* Event Cards Container with scroll */}
                    <div>
                        <CardContainer>
                            {events.map((event, idx) => (
                                <EventCard
                                    key={idx}
                                    image={event.image}
                                    title={event.title}
                                    description={event.description}
                                    date={event.date}
                                    onClick={() => handleCardClick(event)}
                                />
                            ))}
                        </CardContainer>
                    </div>
                    {/* Go To Calendar */}
                    <div className="mt-auto pt-6 flex justify-end mr-6">
                        <button
                            className="text-secondary hover:text-primary text-xl font-medium transition-colors">
                            Go To Calendar -&gt;
                        </button>
                    </div>
                    {/* Chatbot icon at right bottom */}
                    <img
                        src={chatbot}
                        alt="Chatbot Logo"
                        className="fixed bottom-1 right-10 w-18 h-18 z-30 cursor-pointer"
                    />
                    {/* Event Detail Popup */}
                    <EventDetailPopup
                        isOpen={popupOpen}
                        onClose={() => setPopupOpen(false)}
                        eventData={selectedEvent ? getPopupData(selectedEvent) : null}
                        role="staff"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
