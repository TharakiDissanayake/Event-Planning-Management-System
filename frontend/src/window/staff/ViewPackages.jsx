import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import logo from "../../assets/icons/logo.png";
import chatbot from "../../assets/icons/chatbot.gif";
import CardContainer from "../../components/CardContainer";
import PackageCard from "../../components/PackageCard";
import PackageDetailsPopupWindow from "../../components/PackageDetailsPopupWindow";
import { useAuth } from "../../contexts/AuthContext";
import { packageService } from "../../services/packageService";

const ViewPackages = () => {
	const { user } = useAuth();
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [packageTypes, setPackageTypes] = useState(["All Packages"]);
	const [packageCategories, setPackageCategories] = useState(["All Categories"]);
	const [selectedType, setSelectedType] = useState("All Packages");
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [popupOpen, setPopupOpen] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(null);

	// Get user role
	const userRole = user?.userRole?.toLowerCase() || user?.role?.toLowerCase() || "staff";

	// Fetch packages from backend
	const fetchPackages = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await packageService.getAllPackages();
			
			// Extract packages from the nested response structure
			const packagesData = response?.data || response;
			
			if (packagesData && Array.isArray(packagesData)) {
				setPackages(packagesData);
				
				// Extract unique package names for the dropdown
				const uniqueTypes = ["All Packages", ...new Set(packagesData.map(pkg => pkg.packageName))];
				setPackageTypes(uniqueTypes);
				
				// Extract unique package categories for the dropdown
				const uniqueCategories = ["All Categories", ...new Set(packagesData.map(pkg => pkg.packageCategory))];
				setPackageCategories(uniqueCategories);
			} else {
				setPackages([]);
			}
		} catch (err) {
			console.error('Error fetching packages:', err);
			setError('Failed to load packages. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	// Fetch packages on component mount
	useEffect(() => {
		fetchPackages();
	}, []);

	// Filter packages based on dropdown selections
	const filteredPackages = packages.filter(pkg => {
		const matchesType = selectedType === "All Packages" || pkg.packageName === selectedType;
		const matchesCategory = selectedCategory === "All Categories" || pkg.packageCategory === selectedCategory;
		return matchesType && matchesCategory;
	});

	// Handle card click to open popup
	const handleCardClick = (pkg) => {
		setSelectedPackage(pkg);
		setPopupOpen(true);
	};

	// Map package data for popup (adjust as needed)
	const getPopupData = (pkg) => ({
		name: pkg.packageName,
		category: pkg.packageCategory || "Event Package",
		price: pkg.packagePrice || "",
		hall: pkg.hall || "",
		capacity: pkg.capacity || "",
		includes: pkg.includes || "",
		status: pkg.packageStatus ? "Active" : "Inactive",
		description: pkg.includes || "",
		eventCategories: pkg.eventCategories || [],
		image: pkg.packageImage ? `http://localhost:8082${pkg.packageImage}` : null,
		// Add more fields if needed
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
						Available Packages
					</h1>
					{/* Filter dropdowns */}
					<div className="mb-6 ml-6 flex gap-6 items-end">
						{/* Package type filter */}
						<div>
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
						{/* Package category filter */}
						<div>
							<label className="mr-3 font-semibold text-lg text-dark">Select Category:</label>
							<select
								className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								{packageCategories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						{/* Clear filters button */}
						{(selectedType !== "All Packages" || selectedCategory !== "All Categories") && (
							<button
								onClick={() => {
									setSelectedType("All Packages");
									setSelectedCategory("All Categories");
								}}
								className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
							>
								Clear Filters
							</button>
						)}
					</div>
					{/* Card Container with filtered packages */}
					<div>
						{loading && (
							<div className="text-center py-8">
								<div className="text-lg text-gray-600">Loading packages...</div>
							</div>
						)}
						
						{error && (
							<div className="text-center py-8">
								<div className="text-lg text-red-600 mb-4">{error}</div>
								<button 
									onClick={fetchPackages}
									className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
								>
									Try Again
								</button>
							</div>
						)}
						
						{!loading && !error && (
							<CardContainer>
								{filteredPackages.length > 0 ? (
									filteredPackages.map((pkg, idx) => {
										// Convert boolean status to readable text
										const getStatusText = (status) => {
											if (status === true || status === 'true') return 'Active';
											if (status === false || status === 'false') return 'Inactive';
											return status || 'Unknown';
										};
										
										// Handle both possible field names for status
										const statusValue = pkg.packageStatus !== undefined ? pkg.packageStatus : pkg.isPackageStatus;
										
										return (
											<PackageCard
												key={pkg.packageId || idx}
												packageImage={pkg.packageImage}
												packageName={pkg.packageName}
												packageDescription={pkg.includes}
												packageStatus={getStatusText(statusValue)}
												onClick={() => handleCardClick(pkg)}
											/>
										);
									})
								) : (
									<div className="col-span-full text-center py-8 text-gray-600">
										No packages found.
									</div>
								)}
							</CardContainer>
						)}
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
						role={userRole}
					/>
				</div>
			</div>
		</div>
	);
};

export default ViewPackages;
