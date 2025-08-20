// import React from "react";
// import { User, MessageCircle, Link } from "lucide-react";
// import { LANGUAGE_TO_FLAG } from "../constants";

// const FriendCard = ({ friend }) => {
//   return (
//     <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl shadow-md hover:shadow-lg transition">
//       <div className="card-body p-4">
//         {/* user Info  */}
//         <div className="flex items-center gap-3 mb-3">
//             <img src={friend.ProfilePic} alt={friend.fullName} />
//         </div>
//         <h3 className="font-semibold truncate"> {friend.fullName}</h3>
//       </div>
//       <div className="flex flex-wrap gap-2 mb-3">
//         <span className="badge badge-secondary text-xs">
//             {
//                 getLanguageFlag (friend.nativeLanguage)
//             } Native : {friend.nativeLanguage}
//         </span>
//         <span className="badge badge-outline text-xs">
//             {
//                 getLanguageFlag (friend.learningLanguage)
//             } Native : {friend.learningLanguage}
//         </span>

//       </div>
//       <Link to={`/chat/${friend._id}`} className = "btn btn-outline w-full"> Message...</Link>
//     </div>
//   );
// };

// export default FriendCard;


// export function getLanguageFlag(language){
//     if(!language) return null;

//     const langLower = language.toLowerCase();
//     const countryCode = LANGUAGE_TO_FLAG[langLower];

//     if(countryCode){
//         return(
//             <img src={  `https://flagcdn.com/24*18/${countryCode}.png`} 
//             alt={`${langLower} flag`} 
//             className="h-3 mr-1 inline-block"/>
//         )
//     }
//     return null;
// }

import React from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router"; // ✅ Correct Link import
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="flex flex-col p-4 bg-base-200 rounded-xl shadow-md hover:shadow-lg transition">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={friend.profilePic}
          alt={friend.fullName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <h3 className="font-semibold truncate">{friend.fullName}</h3>
      </div>

      {/* Languages */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="badge badge-secondary text-xs">
          {getLanguageFlag(friend.nativeLanguage)} Native: {friend.nativeLanguage}
        </span>
        <span className="badge badge-outline text-xs">
          {getLanguageFlag(friend.learningLanguage)} Learning: {friend.learningLanguage}
        </span>
      </div>

      {/* Chat Button */}
      <Link
        to={`/chat/${friend._id}`}
        className="btn btn-outline w-full flex items-center gap-2"
      >
        <MessageCircle size={16} />
        Message...
      </Link>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
