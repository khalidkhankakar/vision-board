'use client'

import { connectionIdColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";

import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface CursorProps {
    connectionId: number
}

export const Cursor = memo(({connectionId}: CursorProps) => {

    const info = useOther(connectionId,(user)=>user.info)
    const cursor = useOther(connectionId,(user)=>user.presence.cursor)

    const name = info?.name || 'Teammate'

    if(!cursor) return null

    // Taking the co-ordinates
    const {x,y} = cursor;


    return(
        <foreignObject
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        width={50}
        height={50}
        className="relative"
        >
            <MousePointer2 style={{
                fill: connectionIdColor(connectionId),
                color:connectionIdColor(connectionId),
            }} className="h-4 w-4 " />
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'