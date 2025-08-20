import { CalendarDays } from "lucide-react"; 

const UserJoinDate = ({ createdAt }) => {
  return (
    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg shadow-sm w-fit">
      <CalendarDays className="text-blue-600 w-4 h-4" />
      <div>
        <p className="text-xs text-gray-500">Member since</p>
        <p className="text-sm font-medium text-gray-800">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default UserJoinDate;
