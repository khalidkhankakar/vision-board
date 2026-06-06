import React from 'react'
import { Ellipse } from 'react-konva'

import { colorToCSS } from '@/lib/utils'
import { EllipseLayer } from '@/types/canvas'

interface EllipseLayerProps {
    id: string
    layer: EllipseLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

const EllipseLayerInsert = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: EllipseLayerProps) => {
    const { x, y, width, height, fill } = layer

    return (
        <Ellipse
            x={x + width / 2}
            y={y + height / 2}
            radiusX={width / 2}
            radiusY={height / 2}
            fill={fill ? colorToCSS(fill) : '#e5e7eb'}
            stroke={selectionColor ?? 'transparent'}
            strokeWidth={selectionColor ? 2 : 1}
            onMouseDown={(e) => {
                e.cancelBubble = true
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

export default EllipseLayerInsert