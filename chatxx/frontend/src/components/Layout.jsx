// // import Sidebar from "../components/Sidebar"
// // import Navbar from "../components/Navbar"




// // const Layout = ({ children, showSidebar = false }) => {
// //     return (
// //         <div className='min-h-screen'>
// //             <div className='flex'>
// //                 {showSidebar && <Sidebar />}
// //                 <div>
// //                     <Navbar />
// //                     <main>
// //                         {children}
// //                     </main>

// //                 </div>
// //             </div>

// //         </div>
// //     )
// // }

// // export default Layout

// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// const Layout = ({ children, showSidebar = false }) => {
//     return (
//         <div className="min-h-screen flex">
//             {/* Sidebar (left) */}
//             {showSidebar && (
//                 <aside className="w-64 bg-gray-900 text-white">
//                     <Sidebar />
//                 </aside>
//             )}

//             {/* Main content area */}
//             <div className="flex-1 flex flex-col">
//                 {/* Navbar (top-right controls inside) */}
//                 <Navbar />

//                 {/* Page content */}
//                 <main className="flex-1 p-4">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Layout;
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {showSidebar && (
        <>
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 bg-gray-900 text-white">
            <Sidebar />
          </aside>

          {/* Mobile Sidebar (toggle) */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-40"
                  onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar panel */}
                <motion.aside
                  initial={{ x: -250 }}
                  animate={{ x: 0 }}
                  exit={{ x: -250 }}
                  transition={{ type: "spring", stiffness: 70, damping: 15 }}
                  className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white z-50 shadow-lg"
                >
                  <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
