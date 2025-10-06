import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import Calendar from "../../components/Calender";
import { eventService } from "../../services/eventService";
import EventDetailPopup from "../../components/EventDetailPopup";

const ViewCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    // Function to handle clicking on an event in the calendar
    const handleEventClick = async (event) => {
        try {
            // Fetch full event details
            const response = await eventService.getEventById(event.id);
            if (response && response.data) {
                // Combine event data from calendar with full details from API
                const fullEventData = {
                    ...event,
                    ...response.data,
                    eventId: event.id || response.data.eventId,
                    packageName: event.packageName || response.data.packageName,
                    offerName: event.offerName || response.data.offerName,
                };
                setSelectedEvent(fullEventData);
                setPopupOpen(true);
            } else {
                // If we can't get full details, use what we have
                setSelectedEvent(event);
                setPopupOpen(true);
            }
        } catch (error) {
            console.error("Error fetching event details:", error);
            setSelectedEvent(event);
            setPopupOpen(true);
        }
    };

    // Fetch both pending and completed events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                
                // Fetch both pending and completed events in parallel
                const [pendingResponse, completedResponse] = await Promise.all([
                    eventService.getEventsByStatus('PENDING'),
                    eventService.getEventsByStatus('COMPLETED')
                ]);
                
                // Extract the events from response data
                const pendingEvents = pendingResponse?.data || [];
                const completedEvents = completedResponse?.data || [];
                
                // Format events for the calendar
                const formattedEvents = [...pendingEvents, ...completedEvents].map(event => {
                    // Ensure the date is in the format "YYYY-MM-DD" for the calendar
                    let formattedDate = event.eventDate;
                    
                    // If the date is already in the format we need, use it as is
                    // Otherwise, format it properly
                    if (formattedDate && typeof formattedDate === 'string' && !formattedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        // Try to parse the date into the required format
                        const dateParts = new Date(formattedDate);
                        if (!isNaN(dateParts.getTime())) {
                            formattedDate = dateParts.toISOString().split('T')[0];
                        }
                    }
                    
                    // Extract customer information if available
                    const customerInfo = event.identityNumber || {};
                    const customerId = customerInfo.customerId || event.customerId || '';
                    const customerName = customerInfo.customerName || '';
                    
                    // Format event category if it's an enum object
                    let formattedCategory = event.eventCategory;
                    if (formattedCategory && typeof formattedCategory === 'object') {
                        // If it's an object with a name property, use that
                        formattedCategory = formattedCategory.name || String(formattedCategory);
                    } else if (formattedCategory) {
                        // Otherwise convert it to a nicer format (e.g., WEDDING_CEREMONY -> Wedding Ceremony)
                        formattedCategory = String(formattedCategory)
                            .replace(/_/g, ' ')
                            .toLowerCase()
                            .replace(/\b\w/g, c => c.toUpperCase());
                    }
                    
                    return {
                        id: event.eventId,
                        image: event.eventImage || "/assets/images/event-image.jpg",
                        title: event.eventTitle,
                        description: event.description || "No description available",
                        date: formattedDate,
                        status: event.status, // Include status for color coding
                        customerId: customerId,
                        customerName: customerName,
                        packageId: event.packageId,
                        packageName: event.packageName,
                        offerId: event.offerId,
                        offerName: event.offerName,
                        startTime: event.startTime,
                        // Include formatted event category
                        eventCategory: formattedCategory,
                        // Save original customer object for reference
                        customerObject: event.identityNumber
                    };
                });
                
                console.log("Formatted events for calendar:", formattedEvents);
                setEvents(formattedEvents);
                setError(null);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to load events. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchEvents();
    }, []);

    return (
        <div className="h-screen overflow-hidden">
            <div className="flex h-full">
                <Sidebar />
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
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-lg font-semibold text-gray-600">Loading events...</div>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-lg font-semibold text-red-600">{error}</div>
                            </div>
                        ) : (
                            <Calendar 
                                events={events} 
                                onEventClick={handleEventClick}
                            />
                        )}
                    </div>

                    {/* Event Detail Popup */}
                    {popupOpen && selectedEvent && (
                        <EventDetailPopup
                            event={selectedEvent}
                            onClose={() => setPopupOpen(false)}
                            onEventUpdated={() => {
                                setPopupOpen(false);
                                // Re-fetch events to update the calendar
                                setTimeout(() => {
                                    window.location.reload();
                                }, 500);
                            }}
                        />
                    )}

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