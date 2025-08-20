
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router"; // ✅ Correct import
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, Users as UsersIcon } from "lucide-react";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import UserJoinDate from "../components/UserJoinDate"


const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

  // ✅ Fetch friends list
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // ✅ Fetch recommended users
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users", friends.length], // Refetch when friends change
    queryFn: getRecommendedUsers,
  });

  // ✅ Fetch outgoing friend requests
  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // ✅ Send friend request mutation
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  // ✅ Store outgoing request IDs in a Set

useEffect(() => {
  if (Array.isArray(outgoingFriendReqs) && outgoingFriendReqs.length > 0) {
    const outgoingIds = new Set();

    outgoingFriendReqs.forEach((req) => {
      // Log to verify structure
      console.log(req);

      // If backend sends recipient as object
      if (req.recipient && req.recipient._id) {
        outgoingIds.add(req.recipient._id);
      }
      // If backend sends recipient directly as ID
      else if (req.recipient) {
        outgoingIds.add(req.recipient);
      }
      // If backend just sends request _id
      else if (req._id) {
        outgoingIds.add(req._id);
      }
    });

    setOutgoingRequestIds(outgoingIds);
  }
}, [outgoingFriendReqs]);


  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen">
      <div className="container mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notification" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* Friends list */}
        {loadingFriends ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommended users */}
        <section>
          <div>
            <h2 className="text-xl font-bold">Meet New Learners</h2>
            <p className="text-sm opacity-70">
              Discover the perfect language exchange partner based on your profile...
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div>
              <h3 className="text-lg font-semibold">No recommendations available</h3>
              <p className="text-sm opacity-70">
                Check back later for new language partners
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16">
                          <img
                            src={user.profilePic || ""}
                            alt={user.fullName}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center gap-1 text-sm opacity-70">
                              <MapPinIcon className="size-4" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex flex-col gap-1 text-sm">
                        <span>
                          {getLanguageFlag(user.nativeLanguage)} Native:{" "}
                          {capitalize(user.nativeLanguage)}
                        </span>
                        <span>
                          {getLanguageFlag(user.learningLanguage)} Learning:{" "}
                          {capitalize(user.learningLanguage)}
                        </span>
                      </div>

                      {/* Bio */}
                         <UserJoinDate createdAt={user.createdAt} />


                      {/* Action Button */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-1" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-1" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;

// ✅ Capitalize helper
const capitalize = (str = "") =>
  str.charAt(0).toUpperCase() + str.slice(1);
