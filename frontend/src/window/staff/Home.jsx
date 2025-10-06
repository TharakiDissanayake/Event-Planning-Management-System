import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import EventCard from "../../components/EventCard";
import chatbot from "../../assets/icons/chatbot.gif"
import CardContainer from "../../components/CardContainer";
import EventDetailPopup from "../../components/EventDetailPopup";
import { eventService } from "../../services/eventService";
import { packageService } from "../../services/packageService";
import { offerService } from "../../services/offerService";

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
    const handleCardClick = async (event) => {
        console.log("Card clicked, event data:", event);
        
        try {
            // Fetch detailed event data to ensure we have all relationships
            const eventResponse = await eventService.getEventById(event.eventId);
            if (!eventResponse || !eventResponse.data) {
                setSelectedEvent(event);
                setPopupOpen(true);
                return;
            }
            
            const eventData = eventResponse.data;
            console.log("Fetched detailed event data:", eventData);
            
            // Initialize mergedEvent with basic event data
            const mergedEvent = {
                ...event,
                ...eventData,
                eventImage: eventData.eventImage || event.eventImage
            };
            
            // Fetch package details if packageId exists
            if (eventData.packageId) {
                try {
                    console.log("Fetching package details for ID:", eventData.packageId);
                    const packageResponse = await packageService.getPackageById(eventData.packageId);
                    
                    // Log the full raw response for debugging
                    console.log("Package API raw response:", packageResponse);
                    
                    if (packageResponse && packageResponse.data) {
                        console.log("Package response.data:", packageResponse.data);
                        console.log("Package response.data type:", typeof packageResponse.data);
                        console.log("Package response keys:", Object.keys(packageResponse.data));
                        
                        // This is the Spring Boot StandardResponse structure
                        // It typically has: statusCode, message, data fields
                        if (packageResponse.data.data) {
                            console.log("Package data field:", packageResponse.data.data);
                            console.log("Package data type:", typeof packageResponse.data.data);
                            
                            if (typeof packageResponse.data.data === 'object') {
                                console.log("Package data keys:", Object.keys(packageResponse.data.data));
                            }
                        }
                        
                        // Handle nested structure in the response
                        let packageName = null;
                        
                        // First try: StandardResponse pattern (statusCode, message, data)
                        if (packageResponse.data && packageResponse.data.data && typeof packageResponse.data.data === 'object') {
                            packageName = packageResponse.data.data.packageName;
                            console.log("Found package name in standard response:", packageName);
                        } 
                        // Second try: Direct data pattern
                        else if (packageResponse.data && packageResponse.data.packageName) {
                            packageName = packageResponse.data.packageName;
                            console.log("Found package name directly:", packageName);
                        }
                        // Third try: Look for statusCode pattern from Spring Boot REST controller
                        else if (packageResponse.data && packageResponse.data.statusCode === 200 && packageResponse.data.data) {
                            if (typeof packageResponse.data.data === 'object' && packageResponse.data.data.packageName) {
                                packageName = packageResponse.data.data.packageName;
                                console.log("Found package name in Spring Boot response:", packageName);
                            }
                        }
                        // Last resort: Look everywhere recursively
                        else {
                            // Recursive function to find packageName in any nested object
                            const findPackageName = (obj) => {
                                if (!obj || typeof obj !== 'object') return null;
                                
                                if (obj.packageName) return obj.packageName;
                                
                                for (const key in obj) {
                                    if (typeof obj[key] === 'object') {
                                        const found = findPackageName(obj[key]);
                                        if (found) return found;
                                    }
                                }
                                return null;
                            };
                            
                            packageName = findPackageName(packageResponse.data);
                            console.log("Found package name via deep search:", packageName);
                        }
                        
                        // Use the extracted package name or fallback
                        mergedEvent.packageName = packageName || `Package #${eventData.packageId}`;
                        console.log("Final extracted package name:", mergedEvent.packageName);
                    }
                } catch (packageError) {
                    console.error("Error fetching package details:", packageError);
                    mergedEvent.packageName = `Package #${eventData.packageId}`;
                }
            }
            
            // Fetch offer details if offerId exists
            if (eventData.offerId) {
                try {
                    console.log("Fetching offer details for ID:", eventData.offerId);
                    const offerResponse = await offerService.getOfferById(eventData.offerId);
                    if (offerResponse && offerResponse.data) {
                        console.log("Offer details:", offerResponse.data);
                        // Add offer name to the event data
                        mergedEvent.offerName = offerResponse.data.offerName || 
                                             offerResponse.data.name || 
                                             `Offer #${eventData.offerId}`;
                    }
                } catch (offerError) {
                    console.error("Error fetching offer details:", offerError);
                    mergedEvent.offerName = `Offer #${eventData.offerId}`;
                }
            }
            
            console.log("Final merged event data with package and offer names:", mergedEvent);
            setSelectedEvent(mergedEvent);
        } catch (error) {
            console.error("Error fetching event details:", error);
            // Fallback to the original event data if fetch fails
            setSelectedEvent(event);
        }
        
        setPopupOpen(true);
    };

    // Handle Go to Calendar click
    const handleGoToCalendar = () => {
        navigate('/admin/view-calendar'); // or '/staff/view-calendar' based on role
    };

    // Map event data for popup
    const getPopupData = (event) => {
        console.log("Event data for popup:", event);
        
        // Function to extract packageName or offerName from nested objects
        const findNestedProperty = (obj, propertyNames) => {
            // Base case: not an object
            if (!obj || typeof obj !== 'object') return null;
            
            // Check if obj directly has one of the property names
            for (const propName of propertyNames) {
                if (obj[propName] !== undefined) return obj[propName];
            }
            
            // Recursively check nested objects
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    const found = findNestedProperty(obj[key], propertyNames);
                    if (found) return found;
                }
            }
            
            return null;
        };
        
        // Deeply inspect the event object to find package and offer data
        const inspectEvent = (obj, prefix = "") => {
            if (!obj || typeof obj !== 'object') return;
            
            Object.keys(obj).forEach(key => {
                console.log(`${prefix}${key}:`, obj[key]);
                if (obj[key] && typeof obj[key] === 'object') {
                    inspectEvent(obj[key], `${prefix}${key}.`);
                }
            });
        };
        
        console.log("--- DETAILED EVENT INSPECTION ---");
        inspectEvent(event);
        console.log("--- END INSPECTION ---");
        
        // Extract package and offer names using our helper function
        const extractedPackageName = findNestedProperty(event, ['packageName', 'name']);
        const extractedOfferName = findNestedProperty(event, ['offerName', 'name']);
        
        console.log("Extracted Package Name:", extractedPackageName);
        console.log("Extracted Offer Name:", extractedOfferName);
        
        // Create a structured event object with all possible paths for package and offer data
        return {
            eventId: event.eventId,
            // Access customerId from the identityNumber object correctly
            customerId: event.identityNumber?.customerId || event.customerId || "Unknown",
            customerName: event.identityNumber?.customerName || event.customerName || "Unknown Customer",
            // Use eventCategory instead of eventType for compatibility
            eventType: event.eventCategory || event.eventType || "Not specified", 
            eventTitle: event.eventTitle || "Not specified",
            eventDate: event.eventDate,
            startTime: event.startTime || "Not specified",
            
            // Pass all package-related fields directly
            package: event.package,
            packageId: event.packageId,
            packageName: extractedPackageName || event.packageName,
            
            // Pass all offer-related fields directly
            offer: event.offer,
            offerId: event.offerId,
            offerName: extractedOfferName || event.offerName,
            
            status: event.status || "Pending",
            image: event.eventImage,
            description: event.description || ""
        };
    };

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
