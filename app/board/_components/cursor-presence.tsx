'use client';
import { useOthersConnectionIds, useOthersMapped } from '@liveblocks/react'
import React, { memo } from 'react'
import { Cursor } from './cursor';
import { colorToCSS, getSvgPathFromStroke } from '@/lib/utils';
import { shallow } from '@liveblocks/client';

const Drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow);

    return (
        <>
            {others.map(([key, other]) => {
                if (other.pencilDraft) {
                    return (
                        <path
                            key={key}
                            d={getSvgPathFromStroke(other.pencilDraft)}
                            fill={other.penColor ? colorToCSS(other.penColor) : "#000"}
                        />
                    );
                }

                return null;
            })}
        </>
    )
}

const Cursors = () => {
    const ids = useOthersConnectionIds()
    return (
        <>
        {
            ids.map((id) => <Cursor key={id} connectionId={id} />)
        }
        </>
    )
}


export const CursorPresence = memo(() => {
    return (
        <>
            <Drafts />
            <Cursors />
        </>
    )
})

CursorPresence.displayName = 'CursorPresence'