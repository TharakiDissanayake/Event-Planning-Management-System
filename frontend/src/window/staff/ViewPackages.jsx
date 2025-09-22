import { useState } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import CardContainer from "../../components/CardContainer";
import PackageCard from "../../components/PackageCard";
import PackageDetailsPopupWindow from "../../components/PackageDetailsPopupWindow";

// Example package data
const packages = [
	{
		image: "https://via.placeholder.com/300x120.png?text=Silver+Package",
		title: "Silver Package",
		description:
			"Basic event planning with venue, decoration, and catering for up to 100 guests.",
		startDate: "2025-10-01",
		endDate: "2025-12-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Gold+Package",
		title: "Gold Package",
		description:
			"Includes premium decoration, live music, and photography for up to 200 guests.",
		startDate: "2025-11-01",
		endDate: "2026-01-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Platinum+Package",
		title: "Platinum Package",
		description:
			"All-inclusive event planning with luxury services and custom themes for up to 500 guests.",
		startDate: "2025-12-01",
		endDate: "2026-03-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Silver+Package",
		title: "Silver Package",
		description:
			"Basic event planning with venue, decoration, and catering for up to 100 guests.",
		startDate: "2025-10-01",
		endDate: "2025-12-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Gold+Package",
		title: "Gold Package",
		description:
			"Includes premium decoration, live music, and photography for up to 200 guests.",
		startDate: "2025-11-01",
		endDate: "2026-01-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Platinum+Package",
		title: "Platinum Package",
		description:
			"All-inclusive event planning with luxury services and custom themes for up to 500 guests.",
		startDate: "2025-12-01",
		endDate: "2026-03-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Silver+Package",
		title: "Silver Package",
		description:
			"Basic event planning with venue, decoration, and catering for up to 100 guests.",
		startDate: "2025-10-01",
		endDate: "2025-12-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Gold+Package",
		title: "Gold Package",
		description:
			"Includes premium decoration, live music, and photography for up to 200 guests.",
		startDate: "2025-11-01",
		endDate: "2026-01-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Platinum+Package",
		title: "Platinum Package",
		description:
			"All-inclusive event planning with luxury services and custom themes for up to 500 guests.",
		startDate: "2025-12-01",
		endDate: "2026-03-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Silver+Package",
		title: "Silver Package",
		description:
			"Basic event planning with venue, decoration, and catering for up to 100 guests.",
		startDate: "2025-10-01",
		endDate: "2025-12-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Gold+Package",
		title: "Gold Package",
		description:
			"Includes premium decoration, live music, and photography for up to 200 guests.",
		startDate: "2025-11-01",
		endDate: "2026-01-31",
	},
	{
		image: "https://via.placeholder.com/300x120.png?text=Platinum+Package",
		title: "Platinum Package",
		description:
			"All-inclusive event planning with luxury services and custom themes for up to 500 guests.",
		startDate: "2025-12-01",
		endDate: "2026-03-31",
	},
];

const packageTypes = [
	"All Packages",
	"Silver Package",
	"Gold Package",
	"Platinum Package",
];

const ViewPackages = () => {
	const [selectedType, setSelectedType] = useState("All Packages");
	const [popupOpen, setPopupOpen] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(null);

	// Filter packages based on dropdown selection
	const filteredPackages =
		selectedType === "All Packages"
			? packages
			: packages.filter((pkg) => pkg.title === selectedType);

	// Handle card click to open popup
	const handleCardClick = (pkg) => {
		setSelectedPackage(pkg);
		setPopupOpen(true);
	};

	// Map package data for popup (adjust as needed)
	const getPopupData = (pkg) => ({
		name: pkg.title,
		category: "Event Package",
		price: pkg.price || "",
		hall: pkg.hall || "",
		capacity: pkg.capacity || "",
		includes: pkg.includes || "",
		status: pkg.status || "",
		// Add more fields if needed
	});

	return (
		<div>
			<div className="flex">
				<Sidebar role="admin" />
				<div className="flex-1 p-4 relative">
					{/* Company Logo - top right */}
					<img
						src={logo}
						alt="Company Logo"
						className="absolute top-4 right-6 w-24 h-auto z-20"
					/>
					<h1 className="text-5xl font-bold text-primary mb-6 mt-10 ml-6 drop-shadow-lg">
						Available Packages
					</h1>
					{/* Dropdown to select package type */}
					<div className="mb-6 ml-6">
						<label className="mr-3 font-semibold text-lg text-dark">Select Package:</label>
						<select
							className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
						>
							{packageTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
					{/* Card Container with filtered packages */}
					<div>
						<CardContainer>
							{filteredPackages.map((pkg, idx) => (
								<PackageCard
									key={idx}
									image={pkg.image}
									title={pkg.title}
									description={pkg.description}
									startDate={pkg.startDate}
									endDate={pkg.endDate}
									onClick={() => handleCardClick(pkg)}
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
					{/* Popup Window */}
					<PackageDetailsPopupWindow
						isOpen={popupOpen}
						onClose={() => setPopupOpen(false)}
						packageData={selectedPackage ? getPopupData(selectedPackage) : null}
						role="admin" // Add this line
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewPackages;
