function EventCard({ image, title, description, date, onClick, status, startTime }) {
  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-blue-500';
      case 'COMPLETED':
        return 'bg-gray-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-blue-500'; // Default to blue for unknown statuses
    }
  };

  // Construct full image URL if image exists
  let imageUrl = null;
  if (image) {
    // If image already starts with /uploads/, use as is
    if (image.startsWith('/uploads/')) {
      imageUrl = `http://localhost:8082${image}`;
    } else if (image.startsWith('http')) {
      // If image already has http, use it as is (for placeholder images)
      imageUrl = image;
    } else {
      // Otherwise, assume it's a filename and add the path
      imageUrl = `http://localhost:8082/uploads/${image}`;
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-gray rounded-2xl shadow-md p-2 w-72 h-[250px] cursor-pointer relative
                 transition transform hover:scale-105 hover:shadow-xl flex flex-col"
    >
      {/* Status Badge */}
      {status && (
        <div className={`absolute top-2 right-2 text-xs text-white font-medium px-2 py-1 rounded-full z-10 ${getStatusColor(status)}`}>
          {status?.toUpperCase()}
        </div>
      )}
      
      {/* Image section - always maintains same height */}
      <div className="w-full h-32 rounded-xl overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Image failed to load:', imageUrl);
              // Instead of hiding the image, replace with the placeholder
              e.target.parentNode.innerHTML = `
                <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-500 text-sm">No Image</span>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{description}</p>
      {date && (
        <div className="mt-2 text-xs text-gray-950 font-medium text-right">
          Date: {new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
          {startTime && (
            <span className="ml-1">
              at {startTime}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default EventCard;
