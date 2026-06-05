import { colorToCSS } from '@/lib/utils'
import { EllipseLayer } from '@/types/canvas'
import React from 'react'

interface EllipseLayerProps {
    id: string
    layer: EllipseLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

const EllipseLayerInsert = ({ id, layer, onPointerDown, selectionColor }: EllipseLayerProps) => {
    const { height, width, x, y, fill } = layer
    return (
        <ellipse
            className='drop-shadow-md'
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            strokeWidth={selectionColor ? 2 : 1}
            fill={fill ? colorToCSS(fill) : '#e5e7eb'}
            stroke={selectionColor || 'transparent'}
        />
    )
}

export default EllipseLayerInsert
