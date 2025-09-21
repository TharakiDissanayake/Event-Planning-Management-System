function EventCard({ image, title, description, date, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray rounded-2xl shadow-md p-2 w-72 h-70 cursor-pointer 
                 transition transform hover:scale-105 hover:shadow-xl"
    >
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
