function OfferCard({ offerImage, offerName, offerDescription, startDate, endDate, offerStatus, onClick }) {
  // Construct full image URL if offerImage exists
  const imageUrl = offerImage ? `http://localhost:8082${offerImage}` : null;
  
  return (
    <div
      onClick={onClick}
      className="bg-gray rounded-2xl shadow-md p-2 w-72 h-70 cursor-pointer 
                 transition transform hover:scale-105 hover:shadow-xl flex flex-col"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={offerName}
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
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{offerName}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{offerDescription}</p>
      <div className="flex-1"></div>
      {startDate && endDate && (
        <div className="mt-2 text-xs text-gray-950 font-medium text-right">
          {startDate} - {endDate}
        </div>
      )}
      <div className="mt-1 text-xs font-medium text-right">
        <span className={`px-2 py-1 rounded-full ${
          offerStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          Status: {offerStatus ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
}

export default OfferCard;
