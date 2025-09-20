import { NavLink } from "react-router-dom";
import adminIcon from "../assets/icons/admin.png";
import staffIcon from "../assets/icons/staff.png";

function Sidebar({ role }) {
  const links = [
    { to: "/", label: "Home" },
    { to: "/add-customer", label: "Add Customer" },
    { to: "/add-event", label: "Add Event" },
    { to: "/check-customer", label: "Check Customer" },
    { to: "/view-packages", label: "View Packages"},
    { to: "/view-offers", label: "View Offers"},
    { to: "/add-packages", label: "Add Packages", roles: ["admin"] }, // Only for admin
    { to: "/add-offers", label: "Add Offers", roles: ["admin"] }, // Only for admin
  ];

  // Filter links based on role
  const filteredLinks = links.filter(link => !link.roles || link.roles.includes(role));

  return (
    <aside className="w-80 bg-soft min-h-screen flex flex-col p-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-15">
        <div className="w-30 h-30 bg-gray-300 rounded-full mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={role === "admin" ? adminIcon : staffIcon}
            alt={role}
            className="w-full h-full object-cover"
          />
        </div>
        {/* <span className="font-semibold text-lg">Name</span> */}
        <span className="text-md text-gray-700">{role === "admin" ? "Admin" : "Staff"}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4">
        {filteredLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block text-center py-3 rounded-md font-medium transition-colors
               ${isActive
                ? "bg-primary text-white shadow-md"
                : "bg-secondary text-white hover:bg-primary/80"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 flex justify-end">
        <button
          // onClick={() => {
          //   localStorage.removeItem("user");
          //   window.location.reload(); // redirect to login
          // }}
          className="text-secondary hover:text-primary text-xl font-medium transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
