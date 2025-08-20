import { VideoIcon } from "lucide-react";

export default function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition duration-200 shadow-md"
      aria-label="Start Video Call"
    >
      <VideoIcon className="w-5 h-5" />
    </button>
  );
}
