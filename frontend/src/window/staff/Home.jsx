import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import EventCard from "../../components/EventCard";
import chatbot from "../../assets/icons/chatbot.gif"
import CardContainer from "../../components/CardContainer";
import EventDetailPopup from "../../components/EventDetailPopup";
import { eventService } from "../../services/eventService";

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
    const navigate = useNavigate();
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch pending events when component mounts
    useEffect(() => {
        const fetchPendingEvents = async () => {
            try {
                setLoading(true);
                const response = await eventService.getEventsByStatus('PENDING');
                console.log('Pending events:', response);
                if (response && response.data) {
                    console.log('First event data:', response.data[0]); // Log the first event to see its structure
                    
                    // Sort events by date (oldest first)
                    const sortedEvents = [...response.data].sort((a, b) => {
                        const dateA = new Date(a.eventDate);
                        const dateB = new Date(b.eventDate);
                        return dateA - dateB; // For ascending order (oldest first)
                    });
                    
                    setPendingEvents(sortedEvents);
                }
            } catch (err) {
                console.error('Error fetching pending events:', err);
                setError(err.message || 'Failed to load pending events');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingEvents();
    }, []);

    // Handle card click to open popup
    const handleCardClick = (event) => {
        console.log("Card clicked, event data:", event);
        setSelectedEvent(event);
        setPopupOpen(true);
    };

    // Handle Go to Calendar click
    const handleGoToCalendar = () => {
        navigate('/admin/view-calendar'); // or '/staff/view-calendar' based on role
    };

    // Map event data for popup
    const getPopupData = (event) => ({
        eventId: event.eventId,
        customerId: event.identityNumber?.identityNumber || "Unknown",
        customerName: event.identityNumber?.customerName || "Unknown Customer",
        eventType: event.eventTitle,
        eventDate: event.eventDate,
        startTime: event.startTime,
        status: event.status,
        image: event.eventImage,
        description: event.description
    });

    return (
        <div>
            <div className="flex">
                <Sidebar />
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
                            {loading ? (
                                <div className="w-full text-center p-10">
                                    <p className="text-xl text-gray-500">Loading events...</p>
                                </div>
                            ) : (
                                <>
                                    {pendingEvents.length > 0 ? (
                                        pendingEvents.map((event, idx) => (
                                            <EventCard
                                                key={idx}
                                                image={event.eventImage || "https://via.placeholder.com/300x120.png?text=Event"}
                                                title={event.eventTitle}
                                                description={event.description || "No description provided"}
                                                date={event.eventDate}
                                                status={event.status}
                                                startTime={event.startTime}
                                                onClick={() => handleCardClick(event)}
                                            />
                                        ))
                                    ) : (
                                        <div className="w-full text-center p-10">
                                            <p className="text-xl text-gray-500">No pending events found</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardContainer>
                    </div>
                    {/* Go To Calendar */}
                    <div className="mt-1 pt-4 flex justify-end mr-6">
                        <button
                            onClick={handleGoToCalendar}
                            className="text-secondary hover:text-primary text-xl font-medium transition-colors"
                        >
                            Go To Calendar -&gt;
                        </button>
                    </div>
                    {/* Chatbot icon at right bottom */}
                    <img
                        src={chatbot}
                        alt="Chatbot Logo"
                        className="fixed bottom-1 right-10 w-15 h-15 z-30 cursor-pointer"
                    />
                    {/* Event Detail Popup */}
                    <EventDetailPopup
                        isOpen={popupOpen}
                        onClose={() => setPopupOpen(false)}
                        eventData={selectedEvent ? getPopupData(selectedEvent) : null}
                        role="admin"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
