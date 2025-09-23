import { useState } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import Calendar from "../../components/Calender";

// Example event data with dates
const events = [
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+1",
        title: "Annual Gala",
        description: "A grand celebration with dinner, music, and awards.",
        date: "2025-01-15",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+2",
        title: "Team Building",
        description: "Fun activities to strengthen team spirit.",
        date: "2025-01-22",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+3",
        title: "Product Launch",
        description: "Introducing our latest product to the market.",
        date: "2025-02-01",
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+4",
        title: "Workshop",
        description: "Educational workshop for employees.",
        date: "2025-01-15", // Same date as Annual Gala
    },
    {
        image: "https://via.placeholder.com/300x120.png?text=Event+5",
        title: "Conference",
        description: "Industry conference and networking.",
        date: "2025-02-14",
    }
];

const ViewCalendar = () => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="flex h-full">
                <Sidebar role="admin" />
                <div className="flex-1 p-4 relative flex flex-col">
                    {/* Company Logo - top right */}
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="absolute top-4 right-6 w-24 h-auto z-20"
                    />
                    <h1 className="text-5xl font-bold text-primary mb-6 mt-10 ml-6 drop-shadow-lg flex-shrink-0">
                        Event Calendar
                    </h1>

                    {/* Calendar Container */}
                    <div
                        className="border-2 border-secondary rounded-3xl flex-1 overflow-auto px-6"
                        style={{
                            maxHeight: "calc(100vh - 260px)",
                            overflowY: "auto",
                            background: "rgba(255,255,255,0.85)",
                        }}>
                        <Calendar events={events} />
                    </div>

                    {/* Chatbot icon at right bottom */}
                    <img
                        src={chatbot}
                        alt="Chatbot Logo"
                        className="fixed bottom-1 right-10 w-15 h-15 z-30 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewCalendar;