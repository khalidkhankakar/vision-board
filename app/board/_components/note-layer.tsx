'use client';
import { colorToCSS } from '@/lib/utils'
import { NoteLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react'
import React, { useState } from 'react'

interface NoteLayerProps {
    id: string
    layer: NoteLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
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

    return (
        <g
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            <rect
                className='drop-shadow-md'
                onPointerDown={(e) => onPointerDown(e, id)}
                onDoubleClick={handleDoubleClick}
                x={0}
                y={0}
                width={width}
                height={height}
                rx={4}
                ry={4}
                strokeWidth={selectionColor ? 2 : 1}
                fill={fill ? colorToCSS(fill) : '#ffd93d'}
                stroke={selectionColor || 'transparent'}
            />
            {!isEditing && (
                <text
                    x={8}
                    y={20}
                    fill='#000'
                    fontSize='12'
                    fontFamily='Arial'
                    pointerEvents='none'
                    onDoubleClick={handleDoubleClick}
                >
                    {value || 'Double-click to edit'}
                </text>
            )}
            {isEditing && (
                <foreignObject x={4} y={4} width={width - 8} height={height - 8}>
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
                            padding: '4px',
                            fontSize: '12px',
                            fontFamily: 'Arial',
                            backgroundColor: 'transparent',
                            resize: 'none',
                            outline: 'none'
                        }}
                    />
                </foreignObject>
            )}
        </g>
    )
}

export default NoteLayerInsert
