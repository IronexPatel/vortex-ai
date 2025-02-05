import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatarComponent = () => {
   const { user } = useUser();

   console.log("User Data:", user); // Debug user data to find the correct properties

   return (
      <Avatar className="w-8 h-8">
         <AvatarImage
            src={user?.imageUrl || "https://via.placeholder.com/40"} // Use `imageUrl` for the profile picture
            alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
         />
         <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
         </AvatarFallback>
      </Avatar>
   );
};
