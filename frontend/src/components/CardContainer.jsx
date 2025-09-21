function CardContainer({ children }) {
  return (
    <div
      className="container mx-auto px-6 border-2 border-secondary rounded-3xl"
      style={{
        maxHeight: "calc(100vh - 260px)",
        overflowY: "auto",
        background: "rgba(255,255,255,0.85)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-6">
        {children}
      </div>
    </div>
  );
}

export default CardContainer;