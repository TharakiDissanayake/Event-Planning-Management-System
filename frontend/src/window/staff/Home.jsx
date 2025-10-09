import { useState, useEffect, useCallback } from "react";
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
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Create a memoized function to fetch pending events
    const fetchPendingEvents = useCallback(async () => {
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
    }, []);

    // Fetch pending events when component mounts
    useEffect(() => {
        fetchPendingEvents();
    }, [fetchPendingEvents]);

    // Handle card click to open popup
    const handleCardClick = async (event) => {
        console.log("Card clicked, event data:", event);
        
        try {
            // Fetch detailed event data to ensure we have all relationships
            const eventResponse = await eventService.getEventById(event.eventId);
            if (!eventResponse || !eventResponse.data) {
                console.warn("Could not fetch detailed event data, using card data instead");
                setSelectedEvent(event);
                setPopupOpen(true);
                return;
            }
            
            const eventData = eventResponse.data;
            console.log("Fetched detailed event data:", eventData);
            
            // Initialize mergedEvent with basic event data, prioritizing detailed data
            const mergedEvent = {
                ...event,                          // First, get the card data
                ...eventData,                      // Override with detailed API data
                eventImage: eventData.eventImage || event.eventImage,  // Ensure image is preserved
                // Preserve these fields from the card if they exist
                packageName: event.packageName || eventData.packageName,
                offerName: event.offerName || eventData.offerName
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
                        
                        // Extract package name with fallbacks
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
                        
                        // For extra thoroughness, do a recursive search
                        if (!packageName) {
                            // Recursive function to find packageName in any nested object
                            const findPackageName = (obj) => {
                                if (!obj || typeof obj !== 'object') return null;
                                
                                if (obj.packageName) return obj.packageName;
                                
                                for (const key in obj) {
                                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                                        const found = findPackageName(obj[key]);
                                        if (found) return found;
                                    }
                                }
                                return null;
                            };
                            
                            packageName = findPackageName(packageResponse.data);
                            console.log("Found package name via deep search:", packageName);
                        }
                        
                        // Store package name in both conventional and special properties
                        mergedEvent.packageName = packageName || `Package #${eventData.packageId}`;
                        mergedEvent._packageName = packageName; // Special property that won't be overwritten
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
                    
                    // Log the full offer response for debugging
                    console.log("Offer API raw response:", offerResponse);
                    
                    if (offerResponse && offerResponse.data) {
                        // Extract offer name with fallbacks
                        let offerName = null;
                        
                        // Check different response formats
                        if (offerResponse.data.data && offerResponse.data.data.offerName) {
                            offerName = offerResponse.data.data.offerName;
                        } else if (offerResponse.data.offerName) {
                            offerName = offerResponse.data.offerName;
                        } else {
                            // Recursive search
                            const findOfferName = (obj) => {
                                if (!obj || typeof obj !== 'object') return null;
                                
                                if (obj.offerName) return obj.offerName;
                                
                                for (const key in obj) {
                                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                                        const found = findOfferName(obj[key]);
                                        if (found) return found;
                                    }
                                }
                                return null;
                            };
                            
                            offerName = findOfferName(offerResponse.data);
                        }
                        
                        // Store offer name in both conventional and special properties
                        mergedEvent.offerName = offerName || `Offer #${eventData.offerId}`;
                        mergedEvent._offerName = offerName; // Special property that won't be overwritten
                        console.log("Final extracted offer name:", mergedEvent.offerName);
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

    // Handle closing the popup (including after updates)
    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedEvent(null);
        
        // Refresh the events list whenever the popup is closed
        // This ensures updates are immediately visible
        fetchPendingEvents();
    };

    // Handle Go to Calendar click
    const handleGoToCalendar = () => {
        // Get user role and navigate to the appropriate calendar route
        const userRole = user?.userRole?.toLowerCase() || user?.role?.toLowerCase() || 'staff';
        navigate(`/${userRole}/view-calendar`);
    };

    // Map event data for popup
    const getPopupData = (event) => {
        console.log("Event data for popup:", event);
        
        // Enhanced function to extract packageName or offerName from nested objects
        const findNestedProperty = (obj, propertyNames) => {
            // Base case: not an object
            if (!obj || typeof obj !== 'object') return null;
            
            // Check if obj directly has one of the property names
            for (const propName of propertyNames) {
                if (obj[propName] !== undefined) return obj[propName];
            }
            
            // Recursively check nested objects (with more thorough depth)
            for (const key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    if (key === 'data' && obj.data && typeof obj.data === 'object') {
                        // Special handling for common API response pattern
                        for (const propName of propertyNames) {
                            if (obj.data[propName] !== undefined) return obj.data[propName];
                        }
                    }
                    
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
        
        // Extract package and offer names using multiple approaches
        
        // First try: direct access from top-level event properties
        let packageName = event.packageName || null;
        let offerName = event.offerName || null;
        
        // Second try: Our special preserved properties that won't be overwritten
        if (!packageName) packageName = event._packageName || null;
        if (!offerName) offerName = event._offerName || null;
        
        // Third try: Deep recursive search for any property with packageName/offerName
        if (!packageName) packageName = findNestedProperty(event, ['packageName', 'name']);
        if (!offerName) offerName = findNestedProperty(event, ['offerName', 'name']);
        
        // Fourth try: Access from related objects
        if (!packageName && event.package) {
            if (typeof event.package === 'object') {
                packageName = event.package.packageName || event.package.name || null;
            }
        }
        
        if (!offerName && event.offer) {
            if (typeof event.offer === 'object') {
                offerName = event.offer.offerName || event.offer.name || null;
            }
        }
        
        // Fifth try: Access from id objects
        if (!packageName && event.packageId && typeof event.packageId === 'object') {
            packageName = event.packageId.packageName || event.packageId.name || null;
        }
        
        if (!offerName && event.offerId && typeof event.offerId === 'object') {
            offerName = event.offerId.offerName || event.offerId.name || null;
        }
        
        console.log("Final Package Name:", packageName);
        console.log("Final Offer Name:", offerName);
        
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
            packageName: packageName || (event.packageId ? `Package #${event.packageId}` : "Not specified"),
            _packageName: packageName, // Preserve extracted package name
            
            // Pass all offer-related fields directly
            offer: event.offer,
            offerId: event.offerId,
            offerName: offerName || (event.offerId ? `Offer #${event.offerId}` : "Not specified"),
            _offerName: offerName, // Preserve extracted offer name
            
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
                    {/* Chatbot icon at right bottom
                    <img
                        src={chatbot}
                        alt="Chatbot Logo"
                        className="fixed bottom-1 right-10 w-15 h-15 z-30 cursor-pointer"
                    /> */}
                    {/* Event Detail Popup */}
                    <EventDetailPopup
                        isOpen={popupOpen}
                        onClose={handleClosePopup}
                        eventData={selectedEvent ? getPopupData(selectedEvent) : null}
                        role="admin"
                        onEventUpdated={fetchPendingEvents}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
