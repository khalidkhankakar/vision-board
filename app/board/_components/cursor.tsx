'use client'

import { connectionIdColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";

import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface CursorProps {
    connectionId: number
}

export const Cursor = memo(({connectionId}: CursorProps) => {

    const info = useOther(connectionId, (user) => ({
        cursor: user.presence.cursor,
        name: user.info.name,
    }))

    if(!info.cursor) return null

    // Taking the co-ordinates
    const {x,y} = info.cursor;
    const color = connectionIdColor(connectionId);


    return(
        <foreignObject
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        width={160}
        height={56}
        className="pointer-events-none"
        >
            <div className="relative h-full w-full">
                <MousePointer2 style={{
                    fill: color,
                    color,
                }} className="h-4 w-4" />
                <div
                    style={{ backgroundColor: color }}
                    className="absolute left-3 top-5 max-w-36 truncate rounded-md px-2 py-1 text-xs font-medium leading-none text-white shadow-sm"
                >
                    {info.name || "Teammate"}
                </div>
            </div>
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'
