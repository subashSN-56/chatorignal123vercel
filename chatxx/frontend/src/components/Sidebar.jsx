
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, Home, ShipWheel, Users } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({ onClose }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Home", path: "/", icon: <Home className="size-5 font-sans" /> },
    { label: "Friends", path: "/friends", icon: <Users className="size-5" /> },
    { label: "Notifications", path: "/notification", icon: <Bell className="size-5" /> },
  ];

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className="flex flex-col h-full"
    >
      {/* Logo */}
      <div className="p-5 border-b border-primary/20 flex items-center gap-2.5">
        <ShipWheel
          className="size-9 text-primary animate-spin"
          style={{ animationDuration: "3s" }} // slow down
        />
        <span className="text-3xl font-bold font-mono bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text tracking-wider">
          Streamify
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.div key={item.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={item.path}
              onClick={onClose} // ✅ close sidebar on mobile
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 
                ${currentPath === item.path
                  ? "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-md"
                  : "hover:bg-primary/10 text-base-content"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* USER PROFILE */}
      {authUser && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-t border-primary/20 bg-base-300/40"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="avatar ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <div className="w-10 rounded-full">
                <img src={authUser.profilePic || ""} alt={authUser.fullName} />
              </div>
            </motion.div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <motion.span
                  className="size-2 rounded-full bg-success inline-block"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
                Online
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
