// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";
// import "@stream-io/video-react-sdk/dist/css/styles.css";

// import {
//   StreamVideo,
//   StreamVideoClient,
//   StreamCall,
//   CallControls,
//   SpeakerLayout,
//   StreamTheme,
// } from "@stream-io/video-react-sdk";
// import ChatLoader from "../components/ChatLoader";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const CallPage = () => {
//   const { id: callId } = useParams();
//   const navigate = useNavigate();

//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);

//   const { authUser } = useAuthUser();

//   const { data: tokenData } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser,
//   });

//   useEffect(() => {
//     const initCall = async () => {
//       if (!tokenData?.token || !authUser || !callId) return;

//       try {
//         const videoClient = new StreamVideoClient({
//           apiKey: STREAM_API_KEY,
//           user: {
//             id: authUser._id,
//             name: authUser.name,
//             image: authUser.profilePic,
//           },
//           token: tokenData.token,
//         });

//         const streamCall = videoClient.call("default", callId);
//         await streamCall.join({ create: true });

//         setClient(videoClient);
//         setCall(streamCall);
//       } catch (error) {
//         console.error("Error initializing video call:", error);
//       }
//     };

//     initCall();

//     return () => {
//       client?.disconnectUser();
//     };
//   }, [tokenData, authUser, callId]);

//   const handleLeaveCall = async () => {
//     if (call) {
//       await call.leave(); // or call.endCall() if you want to end it for everyone
//     }
//     navigate("/"); // ✅ go back to chat page
//   };

//   if (!client || !call) return <ChatLoader/>;

//   return (
//     <StreamVideo client={client}>
//       <StreamTheme>
//         <StreamCall call={call}>
//           <SpeakerLayout />
//           <CallControls onLeave={handleLeaveCall} />
//         </StreamCall>
//       </StreamTheme>
//     </StreamVideo>
//   );
// };

// export default CallPage;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;