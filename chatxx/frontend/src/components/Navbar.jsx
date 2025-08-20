
// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { logout } from "../lib/api";
// import { Bell, LogOut, ShipWheel } from "lucide-react";
// import toast from "react-hot-toast";
// import ThemeSeletor from "./ThemeSeletor";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   const queryClient = useQueryClient();

//   const { mutate: logoutMutation, isPending } = useMutation({
//     mutationFn: logout,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//       toast.success("Logged out successfully");
//     },
//     onError: () => {
//       toast.error("Logout failed");
//     },
//   });

//   return (
//     <nav className="flex items-center justify-between px-4 py-2 bg-base-200 shadow-md">
//       {/* Left side */}
//       <div className="flex items-center gap-4">
//         <Link to="/" className="flex items-center gap-2 font-bold text-lg">
//           ❄
//            <span className="text-3xl font-bold font-mono bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text tracking-wider">
//            SN
//         </span>
//         </Link>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-4">
//         {!isChatPage && <ThemeSeletor />}
//         <Bell className="cursor-pointer" />
//         {authUser && (
//           <button
//             onClick={() => logoutMutation()}
//             disabled={isPending}
//             className="relative overflow-hidden px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <LogOut size={16} /> Logout
//             </span>
//             <span className="absolute inset-0 bg-white opacity-20 animate-wave"></span>
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// Navbar.jsx
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { Bell, LogOut, ShipWheel, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import ThemeSeletor from "./ThemeSeletor";

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const queryClient = useQueryClient();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-base-200 shadow-md sticky top-0 z-50">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-primary/10"
        >
          {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          {/* <ShipWheel className="size-7 text-primary animate-spin-slow" /> */}
          <ShipWheel
            className="size-7 text-primary animate-spin"
            style={{ animationDuration: "3s" }} // slow down
          />

          <span className="text-3xl font-bold font-mono bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text tracking-wider">
            SN
          </span>
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!isChatPage && <ThemeSeletor />}

        <Link to="/notification">
          <Bell className="cursor-pointer" />
        </Link>

        {authUser && (
          <button
            onClick={() => logoutMutation()}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none disabled:opacity-50"
          >
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
