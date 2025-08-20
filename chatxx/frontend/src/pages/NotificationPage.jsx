
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { acceptFriendRequest, getFriendRequests } from '../lib/api'
import { ClockIcon, MessageSquare, MessageSquareIcon, UserCheckIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

const NotificationPage = () => {
  const queryClient = useQueryClient()

  // Local state for outgoing requests
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set())

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []
  const outgoingFriendReqs = friendRequests?.outgoingReqs || []

  // ✅ Track outgoing request IDs
  useEffect(() => {
    if (Array.isArray(outgoingFriendReqs) && outgoingFriendReqs.length > 0) {
      const outgoingIds = new Set(outgoingFriendReqs.map((req) => req.id))
      setOutgoingRequestIds(outgoingIds)
    }
  }, [outgoingFriendReqs])

  // ✅ Show toast when a request is accepted
  useEffect(() => {
    if (Array.isArray(acceptedRequests) && acceptedRequests.length > 0) {
      acceptedRequests.forEach((req) => {
        toast.success(`${req.recipient.fullName} accepted your friend request!`)
      })
    }
  }, [acceptedRequests])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <UserCheckIcon className="w-6 h-6 text-primary" />
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {/* Incoming Friend Requests */}
            {incomingRequests.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  Friend Requests
                  <span className="bg-primary text-white text-sm px-2 py-0.5 rounded-full">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-4">
                  <AnimatePresence>
                    {incomingRequests.map((request) => (
                      <motion.div
                        key={request._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={request.sender.profilePic}
                              alt={request.sender.fullName}
                              className="w-14 h-14 rounded-full object-cover border border-base-300"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-base-content">
                                {request.sender.fullName}
                              </h3>
                              <div className="text-sm opacity-80 space-x-2">
                                <span>Native: {request.sender.nativeLanguage}</span>
                                <span>Learning: {request.sender.learningLanguage}</span>
                              </div>
                            </div>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => acceptRequestMutation(request._id)}
                              disabled={isPending}
                            >
                              {isPending ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                'Accept'
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {/* Accepted Friend Requests */}
            {acceptedRequests.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-success" />
                  Accepted Friend Requests
                  <span className="bg-success text-white text-sm px-2 py-0.5 rounded-full">
                    {acceptedRequests.length}
                  </span>
                </h2>

                <div className="space-y-4">
                  <AnimatePresence>
                    {acceptedRequests.map((notification) => (
                      <motion.div
                        key={notification._id}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                        className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-200"
                      >
                        <div className="card-body p-4 flex items-center gap-4">
                          <img
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                            className="w-14 h-14 rounded-full object-cover border border-base-300"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{notification.recipient.fullName}</h3>
                            <p className="text-sm opacity-80">
                              {notification.recipient.fullName} accepted your friend request 🎉
                            </p>
                            <div className="flex items-center gap-1 text-xs text-base-content/70 mt-1">
                              <ClockIcon className="w-4 h-4" />
                              Recently
                            </div>
                          </div>
                          <div className="flex flex-col items-center text-success">
                            <MessageSquareIcon className="w-6 h-6" />
                            <span className="text-xs mt-1">New Friend</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {/* No Requests */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <p className="text-center text-base-content/70 mt-6">
                No new notifications 🎉
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NotificationPage
