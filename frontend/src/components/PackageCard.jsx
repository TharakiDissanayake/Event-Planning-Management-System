function PackageCard({ packageImage, packageName, packageDescription, packageStatus, onClick }) {
  // Construct full image URL if packageImage exists
  let imageUrl = null;
  if (packageImage) {
    // If packageImage already starts with /uploads/, use as is
    if (packageImage.startsWith('/uploads/')) {
      imageUrl = `http://localhost:8082${packageImage}`;
    } else {
      imageUrl = `http://localhost:8082/uploads/${packageImage}`;
    }
  }
  
  return (
    <div
      onClick={onClick}
      className="bg-gray rounded-2xl shadow-md p-2 w-72 h-70 cursor-pointer 
                 transition transform hover:scale-105 hover:shadow-xl flex flex-col"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={packageName}
          className="w-full h-30 object-cover rounded-xl"
          onError={(e) => {
            console.log('Image failed to load:', imageUrl);
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-30 bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{packageName}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{packageDescription}</p>
      <div className="flex-1"></div>
      <div className="mt-2 text-xs text-gray-950 font-medium text-right">
        Status: {packageStatus || 'No Status'}
      </div>
    </div>
  );
}

export default PackageCard;
