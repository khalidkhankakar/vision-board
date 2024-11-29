import Tip from "@/components/shared/tooltip";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
interface UserAvatarProps {
    src?: string;
    name?: string;
    fallback?: string;
    borderColor?: string;
}
const UserAvatar = ({ src, name,  borderColor }: UserAvatarProps) => {
    return (
        <Tip label={name || "Teammate"} side='bottom' >
        <Avatar style={{ border: `2px solid ${borderColor}`, cursor: 'pointer' }}>
            <AvatarImage src={src} />
            <AvatarFallback>{name![0] || 'A'}</AvatarFallback>
        </Avatar>
        </Tip>
    )
}

export default UserAvatar
