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
    const fallback = name?.[0] || 'A'
    return (
        <Tip label={name || "Teammate"} side='bottom' >
        <Avatar className="h-8 w-8 bg-[var(--color-paper-2)] text-xs text-[var(--color-ink)]" style={{ border: `2px solid ${borderColor || 'var(--color-rule)'}`, cursor: 'pointer' }}>
            <AvatarImage src={src} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        </Tip>
    )
}

export default UserAvatar
