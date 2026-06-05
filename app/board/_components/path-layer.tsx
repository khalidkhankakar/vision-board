import { colorToCSS } from '@/lib/utils'
import { PathLayer } from '@/types/canvas'
import getStroke from 'perfect-freehand'
import React from 'react'

interface PathLayerProps {
    id: string
    layer: PathLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

function getSvgPathFromStroke(stroke: number[][]): string {
    if (!stroke.length) return ''
    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length]
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
            return acc
        },
        ['M', ...stroke[0], 'Q']
    )
    d.push('Z')
    return d.join(' ')
}

const PathLayer = ({ id, layer, onPointerDown, selectionColor }: PathLayerProps) => {
    const { x, y, fill, points } = layer

    const pathData = getSvgPathFromStroke(
        getStroke(points, {
            size: 6,
            thinning: 0.5,
            smoothing: 0.5,
            streamline: 0.5,
            easing: (t) => t,
            simulatePressure: points[0]?.length < 3,
        })
    )

    return (
        <path
            d={pathData}
            fill={fill ? colorToCSS(fill) : '#1a1a2e'}
            stroke={selectionColor || 'none'}
            strokeWidth={selectionColor ? 2 : 0}
            style={{  transform: `translate(${x}px, ${y}px)`, cursor: 'grab' }}
            onPointerDown={(e) => onPointerDown(e, id)}
        />
    )
}

export default PathLayer