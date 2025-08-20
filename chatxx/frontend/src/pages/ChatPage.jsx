
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useauthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import "stream-chat-react/dist/css/v2/index.css";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useauthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["StreamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing Stream Chat client...");
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup when leaving the page
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, targetUserId]);

  if (loading || !chatClient || !channel) return <ChatLoader />;
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `Subash has started a video call. Join here: ${callUrl}`,
        developer: "Developer: Subash"
      });

      toast.success("Video call link sent successfully!");
    }
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <div className="relative flex-1 flex flex-col">
            {/* Call button positioned at the top-right of the chat window */}
            <div className="absolute top-3 right-3 z-10">
              <CallButton handleVideoCall={handleVideoCall} />
            </div>

            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>

            <Thread />
          </div>
        </Channel>
      </Chat>
    </div>

  );
};

export default ChatPage;
