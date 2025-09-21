import { useState } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import CardContainer from "../../components/CardContainer";
import OfferCard from "../../components/OfferCard";

// Example offer data
const offers = [
  {
    image: "https://via.placeholder.com/300x120.png?text=Silver+Offer",
    title: "Silver Offer",
    description: "Get 10% off on Silver Package bookings made before November 2025.",
    startDate: "2025-09-15",
    endDate: "2025-11-15",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Gold+Offer",
    title: "Gold Offer",
    description: "Free welcome drinks for all guests with Gold Package bookings.",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Platinum+Offer",
    title: "Platinum Offer",
    description: "Complimentary photography service with every Platinum Package.",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Silver+Offer",
    title: "Silver Offer",
    description: "Get 10% off on Silver Package bookings made before November 2025.",
    startDate: "2025-09-15",
    endDate: "2025-11-15",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Gold+Offer",
    title: "Gold Offer",
    description: "Free welcome drinks for all guests with Gold Package bookings.",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Platinum+Offer",
    title: "Platinum Offer",
    description: "Complimentary photography service with every Platinum Package.",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Silver+Offer",
    title: "Silver Offer",
    description: "Get 10% off on Silver Package bookings made before November 2025.",
    startDate: "2025-09-15",
    endDate: "2025-11-15",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Gold+Offer",
    title: "Gold Offer",
    description: "Free welcome drinks for all guests with Gold Package bookings.",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Platinum+Offer",
    title: "Platinum Offer",
    description: "Complimentary photography service with every Platinum Package.",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Silver+Offer",
    title: "Silver Offer",
    description: "Get 10% off on Silver Package bookings made before November 2025.",
    startDate: "2025-09-15",
    endDate: "2025-11-15",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Gold+Offer",
    title: "Gold Offer",
    description: "Free welcome drinks for all guests with Gold Package bookings.",
    startDate: "2025-10-01",
    endDate: "2025-12-31",
  },
  {
    image: "https://via.placeholder.com/300x120.png?text=Platinum+Offer",
    title: "Platinum Offer",
    description: "Complimentary photography service with every Platinum Package.",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
  },
];

const offerTypes = [
  "All Offers",
  "Silver Offer",
  "Gold Offer",
  "Platinum Offer",
];

const ViewOffers = () => {
  const [selectedType, setSelectedType] = useState("All Offers");

  // Filter offers based on dropdown selection
  const filteredOffers =
    selectedType === "All Offers"
      ? offers
      : offers.filter((offer) => offer.title === selectedType);

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
						Available Offers
					</h1>
					{/* Dropdown to select offer type */}
					<div className="mb-6 ml-6">
            <label className="mr-3 font-semibold text-lg text-dark">Select Offer:</label>
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
					{/* Card Container with filtered packages */}
					<div>
						<CardContainer>
							{filteredOffers.map((offer, idx) => (
								<OfferCard
									key={idx}
									image={offer.image}
									title={offer.title}
									description={offer.description}
									startDate={offer.startDate}
									endDate={offer.endDate}
								/>
							))}
						</CardContainer>
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

export default ViewOffers;
