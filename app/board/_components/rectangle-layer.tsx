import { colorToCSS } from '@/lib/utils'
import { RectangleLayer } from '@/types/canvas'
import React from 'react'


interface RectangleLayerProps {
    id: string,
    layer: RectangleLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}

const RectangleLayerInsert = ({ id, layer, onPointerDown, selectionColor }: RectangleLayerProps) => {
    const { height, width, x, y,fill } = layer
    return (
        <rect
            className='drop-shadow-md'
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}

            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill={fill ? colorToCSS(fill):'#000'}
            stroke={selectionColor || 'transparent'}

        />

    )
}

export default RectangleLayerInsert
