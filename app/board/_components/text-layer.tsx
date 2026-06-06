'use client';
import { colorToCSS } from '@/lib/utils'
import { TextLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react'
import React, { useState, useMemo } from 'react'

interface TextLayerProps {
    id: string
    layer: TextLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

/** Scale font size to fill the text layer dimensions */
function getDynamicFontSize(width: number, height: number): number {
    // Base size on the smaller dimension so text always fits
    const minDim = Math.min(width, height)
    if (minDim < 30)  return 12
    if (minDim < 50)  return 16
    if (minDim < 80)  return 22
    if (minDim < 120) return 28
    if (minDim < 180) return 36
    if (minDim < 260) return 48
    if (minDim < 360) return 64
    return 80
}

const TextLayerInsert = ({ id, layer, onPointerDown, selectionColor }: TextLayerProps) => {
    const { height, width, x, y, fill, value } = layer
    const [isEditing, setIsEditing] = useState(false)
    const [textValue, setTextValue] = useState(value || '')

    const updateText = useMutation(({ storage }, newText: string) => {
        const liveLayers = storage.get('layers')
        const layer = liveLayers.get(id)
        if (layer) {
            layer.set('value', newText)
        }
    }, [id])

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsEditing(true)
    }

    const handleSave = () => {
        updateText(textValue)
        setIsEditing(false)
    }

    const fontSize = useMemo(() => getDynamicFontSize(width, height), [width, height])
    const textColor = fill ? colorToCSS(fill) : '#1a1a1a'

    return (
        <g style={{ transform: `translate(${x}px, ${y}px)` }} className='pointer-events-auto'>
            {/* Invisible hit area for pointer events & selection outline */}
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill='transparent'
                stroke={selectionColor || 'transparent'}
                strokeWidth={selectionColor ? 2 : 0}
                strokeDasharray={selectionColor ? '6 3' : undefined}
                rx={2}
                onPointerDown={(e) => onPointerDown(e, id)}
                onDoubleClick={handleDoubleClick}
                style={{ cursor: 'grab' }}
            />

            {/* ── View mode: SVG text, centered & scaled ── */}
            {!isEditing && (
                <text
                    x={width / 2}
                    y={height / 2}
                    fill={textColor}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fontSize={fontSize}
                    fontFamily="'Geist', 'DM Sans', sans-serif"
                    fontWeight='600'
                    letterSpacing='-0.02em'
                    pointerEvents='none'
                    style={{ userSelect: 'none' }}
                >
                    {value ? (
                        // Truncate with ellipsis if text is too long for the box
                        <tspan>
                            {value}
                        </tspan>
                    ) : (
                        <tspan fill={`${textColor}55`} fontWeight='400' fontSize={Math.max(12, fontSize * 0.55)}>
                            Double-click to edit
                        </tspan>
                    )}
                </text>
            )}

            {/* ── Edit mode: styled foreignObject input ── */}
            {isEditing && (
                <foreignObject x={0} y={0} width={width} height={height}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <input
                            type='text'
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave()
                                if (e.key === 'Escape') setIsEditing(false)
                            }}
                            autoFocus
                            style={{
                                width: '100%',
                                border: 'none',
                                padding: '0 6px',
                                fontSize: `${fontSize}px`,
                                fontFamily: "'Geist', 'DM Sans', sans-serif",
                                fontWeight: 600,
                                letterSpacing: '-0.02em',
                                color: textColor,
                                backgroundColor: 'transparent',
                                outline: 'none',
                                textAlign: 'center',
                                caretColor: textColor,
                            }}
                        />
                    </div>
                </foreignObject>
            )}
        </g>
    )
}

export default TextLayerInsert