'use client';
import { colorToCSS } from '@/lib/utils';
import { Color } from '@/types/canvas';
import React, { memo } from 'react'

interface ColorPickerProps {
    onChange: (color: Color) => void
}

export const ColorPicker = memo(({ onChange }: ColorPickerProps) => {
    return (
        <div className='flex flex-wrap gap-x-2 max-w-[160px]'>
            <ColorButton color={{ r: 12, g: 34,b: 34 }} onClick={onChange} />
            <ColorButton color={{ r: 76, g: 23,b: 86 }} onClick={onChange} />
            <ColorButton color={{ r: 13, g: 12,b: 32 }} onClick={onChange} />
            <ColorButton color={{ r: 43, g: 56,b: 45 }} onClick={onChange} />
        </div>
    )
})

ColorPicker.displayName = 'ColorPicker'


interface ColorButtonProps {
    color: Color
    onClick: (color: Color) => void
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
    return (
        <button className='h-8 w-8 rounded-lg' onClick={() => onClick(color)}>
            <div className='h-full w-full' style={{ backgroundColor: colorToCSS(color) }} />
        </button>

)
}
