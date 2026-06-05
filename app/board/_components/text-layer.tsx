'use client';
import { colorToCSS } from '@/lib/utils'
import { TextLayer } from '@/types/canvas'
import { useMutation } from '@liveblocks/react'
import { useStorage } from '@liveblocks/react/suspense'
import React, { useState } from 'react'

interface TextLayerProps {
    id: string
    layer: TextLayer
    onPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
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
                strokeWidth={selectionColor ? 2 : 1}
                fill={fill ? colorToCSS(fill) : '#fff'}
                stroke={selectionColor || 'transparent'}
            />
            {!isEditing && (
                <text
                    x={width / 2}
                    y={height / 2}
                    fill='#000'
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fontSize='14'
                    fontFamily='Arial'
                    pointerEvents='none'
                    onDoubleClick={handleDoubleClick}
                >
                    {value || 'Double-click to edit'}
                </text>
            )}
            {isEditing && (
                <foreignObject x={4} y={4} width={width - 8} height={height - 8}>
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
                            height: '100%',
                            border: 'none',
                            padding: '4px',
                            fontSize: '14px',
                            fontFamily: 'Arial',
                            backgroundColor: 'transparent'
                        }}
                    />
                </foreignObject>
            )}
        </g>
    )
}

export default TextLayerInsert
