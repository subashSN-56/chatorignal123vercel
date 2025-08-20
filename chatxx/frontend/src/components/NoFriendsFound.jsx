// import React from "react";
// import { Users } from "lucide-react";

// const NoFriendsFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-full p-6 text-center">
//       <Users size={48} className="text-gray-400 mb-3" />
//       <h2 className="text-lg font-semibold text-gray-700">No Friends Found</h2>
//       <p className="text-gray-500 mt-1">
//         You haven’t added any friends yet. Start connecting with people!
//       </p>
//     </div>
//   );
// };

// export default NoFriendsFound;
import React from "react";
import { Users, UserPlus } from "lucide-react";
import { Link } from "react-router";

const NoFriendsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <Users size={48} className="text-gray-400 mb-3" />
      <h2 className="text-lg font-semibold text-gray-700">No Friends Found</h2>
      <p className="text-gray-500 mt-1 max-w-sm">
        You haven’t added any friends yet. Start connecting with people!
      </p>

      <Link
        to="/discover"
        className="mt-4 btn btn-primary flex items-center gap-2"
      >
        <UserPlus size={18} />
        Find Friends
      </Link>
    </div>
  );
};

export default NoFriendsFound;
