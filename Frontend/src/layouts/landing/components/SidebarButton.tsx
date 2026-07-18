import { type LucideIcon } from "lucide-react";
import { Link } from "react-router";

interface SidebarButtonProps {
    icon: LucideIcon;
    path:string;
}
function SidebarButton({icon:Icon,path}:SidebarButtonProps){
    return (
        <Link to={path} className="rounded-full hover:bg-[#6C1CD7]/50 cursor-pointer p-4">
            <Icon size={24} color={"white"}/>
        </Link>
    )
}

export default SidebarButton