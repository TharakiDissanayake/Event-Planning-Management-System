import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import adminIcon from "../assets/icons/admin.png";
import staffIcon from "../assets/icons/staff.png";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Use role from authenticated user only
  const currentRole = user?.userRole?.toLowerCase() || user?.role?.toLowerCase() || "staff";
  const baseRoute = currentRole === "admin" ? "/admin" : "/staff";
  
  // Debug logging
  console.log('SideBar Debug:', {
    user: user,
    userRole: user?.userRole,
    currentRole: currentRole
  });
  
  const links = [
    { to: `${baseRoute}/home`, label: "Home" },
    { to: `${baseRoute}/add-customer`, label: "Add Customer" },
    { to: `${baseRoute}/add-event`, label: "Add Event" },
    { to: `${baseRoute}/check-customer`, label: "Check Customer" },
    { to: `${baseRoute}/view-packages`, label: "View Packages"},
    { to: `${baseRoute}/view-offers`, label: "View Offers"},
    { to: `${baseRoute}/add-packages`, label: "Add Packages", roles: ["admin"] }, // Only for admin
    { to: `${baseRoute}/add-offers`, label: "Add Offers", roles: ["admin"] }, // Only for admin
  ];

  // Filter links based on role
  const filteredLinks = links.filter(link => !link.roles || link.roles.includes(currentRole));

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation to login even if logout fails
      navigate('/login', { replace: true });
    }
  };

  return (
    <aside className="w-80 bg-soft min-h-screen flex flex-col p-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-15">
        <div className="w-30 h-30 bg-gray-300 rounded-full mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={currentRole === "admin" ? adminIcon : staffIcon}
            alt={currentRole}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-md text-gray-700 capitalize">
          {user?.userName || (currentRole === "admin" ? "Admin" : "Staff")}
        </span>
        <span className="text-sm text-gray-500">{user?.userEmail}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2.5">
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
          onClick={handleLogout}
          className="text-secondary hover:text-primary text-xl font-medium transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
