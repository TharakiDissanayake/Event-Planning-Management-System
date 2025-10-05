function EventCard({ image, title, description, date, onClick, status }) {
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

  return (
    <div
      onClick={onClick}
      className="bg-gray rounded-2xl shadow-md p-2 w-72 h-70 cursor-pointer relative
                 transition transform hover:scale-105 hover:shadow-xl"
    >
      {/* Status Badge */}
      {status && (
        <div className={`absolute top-2 right-2 text-xs text-white font-medium px-2 py-1 rounded-full z-10 ${getStatusColor(status)}`}>
          {status?.toUpperCase()}
        </div>
      )}
      
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-30 object-cover rounded-xl"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      {date && (
        <div className="mt-2 text-xs text-gray-950 font-medium text-right">
          Date: {date}
        </div>
      )}
    </div>
  );
}

export default EventCard;
