import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import CardContainer from "../../components/CardContainer";
import OfferCard from "../../components/OfferCard";
import OfferDetaiPopup from "../../components/OfferDetailsPopup";
import { useAuth } from "../../contexts/AuthContext";
import offerService from "../../services/offerService";

const ViewOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("All Offers");
  const [searchTerm, setSearchTerm] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Get user role
  const userRole = user?.userRole?.toLowerCase() || user?.role?.toLowerCase() || "staff";

  // Fetch offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching offers from API...");
        const response = await offerService.getAllOffers();
        console.log("Raw API response:", response);

        if (response && response.data && Array.isArray(response.data)) {
          // Map API response to component format
          const mappedOffers = response.data.map((offer) => ({
            ...offer,
            // Format dates for display
            formattedStartDate: offer.startDate ? new Date(offer.startDate).toLocaleDateString() : "",
            formattedEndDate: offer.endDate ? new Date(offer.endDate).toLocaleDateString() : "",
          }));
          
          console.log("Mapped offers:", mappedOffers);
          setOffers(mappedOffers);
          setFilteredOffers(mappedOffers);
        } else {
          console.warn("Invalid API response format:", response);
          setError("Invalid data format received");
          setOffers([]);
          setFilteredOffers([]);
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError(err.response?.data?.message || err.message || "Failed to load offers");
        setOffers([]);
        setFilteredOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Get unique offer types for dropdown
  const offerTypes = ["All Offers", ...new Set(offers.map(offer => offer.offerName))];

  // Filter offers based on search term and type
  useEffect(() => {
    let filtered = [...offers];

    // Filter by search term (offer name)
    if (searchTerm.trim()) {
      filtered = filtered.filter((offer) =>
        offer.offerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected type
    if (selectedType !== "All Offers") {
      filtered = filtered.filter((offer) => offer.offerName === selectedType);
    }

    setFilteredOffers(filtered);
  }, [offers, searchTerm, selectedType]);

  // Handle card click to open popup
  const handleCardClick = (offer) => {
    setSelectedOffer(offer);
    setPopupOpen(true);
  };

  // Map offer data for popup
  const getPopupData = (offer) => ({
    name: offer.offerName,
    category: "Event Offer",
    discount: `${offer.offerDiscount}%`,
    description: offer.offerDescription,
    startDate: offer.formattedStartDate,
    endDate: offer.formattedEndDate,
    packageCategories: offer.packageCategories || [],
    eventCategories: offer.eventCategories || [],
    status: offer.offerStatus ? "Active" : "Inactive",
    image: offer.offerImage ? `http://localhost:8082${offer.offerImage}` : null,
  });

  // Clear search function
  const clearSearch = () => {
    setSearchTerm("");
    setSelectedType("All Offers");
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
						Available Offers
					</h1>

					{/* Search and filter controls */}
					<div className="mb-6 ml-6 space-y-4">
						{/* Search input */}
						<div>
							<label className="block font-semibold text-lg text-dark mb-2">Search Offers:</label>
							<div className="flex gap-2 items-center">
								<input
									type="text"
									placeholder="Search by offer name..."
									className="border border-gray-300 rounded px-3 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-primary"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<button
									onClick={clearSearch}
									className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
								>
									Clear Filters
								</button>
							</div>
						</div>

						{/* Dropdown to select offer type */}
						<div>
							<label className="block font-semibold text-lg text-dark mb-2">Filter by Offer Type:</label>
							<select
								className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
								value={selectedType}
								onChange={(e) => setSelectedType(e.target.value)}
							>
								{offerTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Loading state */}
					{loading && (
						<div className="text-center py-8">
							<div className="text-lg">Loading offers...</div>
						</div>
					)}

					{/* Error state */}
					{error && (
						<div className="text-center py-8">
							<div className="text-red-600 text-lg mb-2">Error loading offers</div>
							<div className="text-red-500">{error}</div>
						</div>
					)}

					{/* No offers message */}
					{!loading && !error && filteredOffers.length === 0 && (
						<div className="text-center py-8">
							<div className="text-gray-600 text-lg">
								{offers.length === 0 ? "No offers available" : "No offers match your search criteria"}
							</div>
						</div>
					)}

					{/* Card Container with filtered offers */}
					{!loading && !error && filteredOffers.length > 0 && (
						<div>
							<CardContainer>
								{filteredOffers.map((offer, idx) => (
									<OfferCard
										key={offer.offerId || idx}
										offerImage={offer.offerImage}
										offerName={offer.offerName}
										offerDescription={offer.offerDescription}
										startDate={offer.formattedStartDate}
										endDate={offer.formattedEndDate}
										offerStatus={offer.offerStatus}
										onClick={() => handleCardClick(offer)}
									/>
								))}
							</CardContainer>
						</div>
					)}

					{/* Chatbot icon at right bottom */}
					<img
						src={chatbot}
						alt="Chatbot Logo"
						className="fixed bottom-1 right-10 w-15 h-15 z-30 cursor-pointer"
					/>
					{/* Popup Window */}
					<OfferDetaiPopup
						isOpen={popupOpen}
						onClose={() => setPopupOpen(false)}
						offerData={selectedOffer ? getPopupData(selectedOffer) : null}
						role={userRole}
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewOffers;
