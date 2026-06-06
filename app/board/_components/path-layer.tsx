import React from 'react'
import { Path } from 'react-konva'
import getStroke from 'perfect-freehand'

import { colorToCSS } from '@/lib/utils'
import { PathLayer as PathLayerType } from '@/types/canvas'

interface PathLayerProps {
    id: string
    layer: PathLayerType
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

function getSvgPathFromStroke(stroke: number[][]): string {
    if (!stroke.length) return ''

    const d: (string | number)[] = ['M', ...stroke[0], 'Q']

    for (let i = 0; i < stroke.length; i++) {
        const [x0, y0] = stroke[i]
        const [x1, y1] = stroke[(i + 1) % stroke.length]

        d.push(
            x0,
            y0,
            (x0 + x1) / 2,
            (y0 + y1) / 2
        )
    }

    d.push('Z')

    return d.join(' ')
}

const PathLayer = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: PathLayerProps) => {
    const { x, y, fill, points } = layer

    const stroke = getStroke(points, {
        size: 6,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        easing: (t: number) => t,
        simulatePressure: (points[0]?.length ?? 0) < 3,
    })

    const pathData = getSvgPathFromStroke(stroke)

    return (
        <Path
            x={x}
            y={y}
            data={pathData}
            fill={fill ? colorToCSS(fill) : '#1a1a2e'}
            stroke={selectionColor ?? 'transparent'}
            strokeWidth={selectionColor ? 2 : 0}
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

export default PathLayer