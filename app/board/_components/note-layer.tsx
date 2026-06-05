'use client';
import { colorToCSS } from '@/lib/utils'
import { NoteLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react'
import React, { useState, useMemo } from 'react'

interface NoteLayerProps {
    id: string
    layer: NoteLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

/** Dynamically scale font size based on note dimensions */
function getDynamicFontSize(width: number, height: number): number {
    const area = width * height
    if (area < 8000) return 10
    if (area < 20000) return 12
    if (area < 40000) return 14
    if (area < 80000) return 17
    if (area < 150000) return 20
    return 24
}

const NoteLayerInsert = ({ id, layer, onPointerDown, selectionColor }: NoteLayerProps) => {
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

    const handleDoubleClick = (e: React.PointerEvent) => {
        e.stopPropagation()
        setIsEditing(true)
    }

    const handleSave = () => {
        updateText(textValue)
        setIsEditing(false)
    }

    const fontSize = useMemo(() => getDynamicFontSize(width, height), [width, height])

    // Derive a slightly darker shade for the fold and shadow from the fill color
    const baseColor = fill ? colorToCSS(fill) : '#fde68a'

    // Top tape strip height
    const tapeH = Math.max(10, height * 0.06)
    // Fold triangle size (bottom-right corner)
    const foldSize = Math.max(12, Math.min(width, height) * 0.12)
    // Inner padding
    const padX = 10
    const padY = tapeH + 8

    return (
        <g style={{ transform: `translate(${x}px, ${y}px)` }}>
            {/* ── Drop shadow filter ── */}
            <defs>
                <filter id={`shadow-${id}`} x='-10%' y='-10%' width='130%' height='130%'>
                    <feDropShadow dx='2' dy='4' stdDeviation='4' floodColor='#00000030' />
                </filter>
                {/* Subtle paper texture via feTurbulence */}
                <filter id={`texture-${id}`}>
                    <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' result='noise' />
                    <feColorMatrix type='saturate' values='0' in='noise' result='grayNoise' />
                    <feBlend in='SourceGraphic' in2='grayNoise' mode='multiply' result='blended' />
                    <feComposite in='blended' in2='SourceGraphic' operator='in' />
                </filter>
                <clipPath id={`clip-${id}`}>
                    {/* Clip to note shape with folded corner */}
                    <polygon points={`
                        0,0
                        ${width},0
                        ${width},${height - foldSize}
                        ${width - foldSize},${height}
                        0,${height}
                    `} />
                </clipPath>
            </defs>

            {/* ── Main note body ── */}
            <polygon
                points={`
                    0,0
                    ${width},0
                    ${width},${height - foldSize}
                    ${width - foldSize},${height}
                    0,${height}
                `}
                fill={baseColor}
                filter={`url(#shadow-${id})`}
                stroke={selectionColor || 'rgba(0,0,0,0.08)'}
                strokeWidth={selectionColor ? 2 : 1}
                onPointerDown={(e) => onPointerDown(e, id)}
                onDoubleClick={handleDoubleClick}
                style={{ cursor: 'grab' }}
            />

            {/* ── Paper texture overlay ── */}
            <polygon
                points={`
                    0,0
                    ${width},0
                    ${width},${height - foldSize}
                    ${width - foldSize},${height}
                    0,${height}
                `}
                fill={baseColor}
                filter={`url(#texture-${id})`}
                opacity={0.18}
                pointerEvents='none'
            />

            {/* ── Folded corner shadow triangle ── */}
            <polygon
                points={`
                    ${width - foldSize},${height}
                    ${width},${height - foldSize}
                    ${width - foldSize},${height - foldSize}
                `}
                fill='rgba(0,0,0,0.13)'
                pointerEvents='none'
            />
            {/* ── Folded corner lighter face ── */}
            <polygon
                points={`
                    ${width - foldSize},${height}
                    ${width},${height - foldSize}
                    ${width - foldSize},${height - foldSize}
                `}
                fill='rgba(255,255,255,0.45)'
                pointerEvents='none'
            />

            {/* ── Tape strip at top ── */}
            <rect
                x={width / 2 - width * 0.2}
                y={-tapeH / 2}
                width={width * 0.4}
                height={tapeH}
                rx={2}
                fill='rgba(255,255,255,0.55)'
                stroke='rgba(0,0,0,0.06)'
                strokeWidth={0.5}
                pointerEvents='none'
            />

            {/* ── Horizontal ruled lines ── */}
            {Array.from({ length: Math.floor((height - padY - 12) / (fontSize + 6)) }).map((_, i) => (
                <line
                    key={i}
                    x1={padX}
                    x2={i === Math.floor((height - padY - 12) / (fontSize + 6)) - 1 ? width - foldSize - 4 : width - padX}
                    y1={padY + i * (fontSize + 6) + fontSize}
                    y2={padY + i * (fontSize + 6) + fontSize}
                    stroke='rgba(0,0,0,0.07)'
                    strokeWidth={0.8}
                    pointerEvents='none'
                />
            ))}

            {/* ── Note text (view mode) ── */}
            {!isEditing && (
                <foreignObject
                    x={padX}
                    y={padY}
                    width={width - padX - foldSize - 4}
                    height={height - padY - 8}
                    pointerEvents='none'
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            fontSize: `${fontSize}px`,
                            fontFamily: "'Caveat', 'Patrick Hand', cursive",
                            color: 'rgba(40,30,10,0.85)',
                            lineHeight: `${fontSize + 6}px`,
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            userSelect: 'none',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {value || (
                            <span style={{ opacity: 0.4, fontStyle: 'italic' }}>
                                Double-click to edit…
                            </span>
                        )}
                    </div>
                </foreignObject>
            )}

            {/* ── Textarea (edit mode) ── */}
            {isEditing && (
                <foreignObject x={padX} y={padY} width={width - padX - foldSize - 4} height={height - padY - 8}>
                    <textarea
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') handleSave()
                        }}
                        autoFocus
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            padding: '0',
                            fontSize: `${fontSize}px`,
                            fontFamily: "'Caveat', 'Patrick Hand', cursive",
                            color: 'rgba(40,30,10,0.9)',
                            lineHeight: `${fontSize + 6}px`,
                            backgroundColor: 'transparent',
                            resize: 'none',
                            outline: 'none',
                            caretColor: 'rgba(40,30,10,0.8)',
                        }}
                    />
                </foreignObject>
            )}
        </g>
    )
}

export default NoteLayerInsert