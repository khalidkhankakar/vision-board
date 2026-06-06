import React from 'react'
import { Rect } from 'react-konva'

import { colorToCSS } from '@/lib/utils'
import { RectangleLayer } from '@/types/canvas'

interface RectangleLayerProps {
    id: string,
    layer: RectangleLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}

const RectangleLayerInsert = ({ id, layer, onPointerDown, selectionColor }: RectangleLayerProps) => {
    const { height, width, x, y, fill } = layer
    return (
        <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill ? colorToCSS(fill) : '#e5e7eb'}
            stroke={selectionColor || 'transparent'}
            strokeWidth={selectionColor ? 2 : 1}
            onMouseDown={(e) => {
                e.cancelBubble = true
                // Konva event to React.PointerEvent like object
                onPointerDown(e.evt as unknown as React.PointerEvent, id)
            }}
            onMouseEnter={(e) => {
                const container = e.target.getStage()?.container();
                if (container) container.style.cursor = 'grab';
            }}
            onMouseLeave={(e) => {
                const container = e.target.getStage()?.container();
                if (container) container.style.cursor = 'default';
            }}
        />
    )
}

export default RectangleLayerInsert
