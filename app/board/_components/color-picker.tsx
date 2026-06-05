'use client';
import { colorToCSS } from '@/lib/utils';
import { Color } from '@/types/canvas';
import React, { memo } from 'react'

interface ColorPickerProps {
    onChange: (color: Color) => void
}

export const ColorPicker = memo(({ onChange }: ColorPickerProps) => {
    return (
        <div className='flex max-w-[160px] flex-wrap gap-2'>
            <ColorButton color={{ r: 24, g: 66,b: 82 }} onClick={onChange} />
            <ColorButton color={{ r: 28, g: 126,b: 110 }} onClick={onChange} />
            <ColorButton color={{ r: 222, g: 162,b: 70 }} onClick={onChange} />
            <ColorButton color={{ r: 238, g: 244,b: 238 }} onClick={onChange} />
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
        <button className='h-8 w-8 rounded-md border border-[var(--color-rule)] bg-[var(--color-paper)] p-1 shadow-sm transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]' onClick={() => onClick(color)}>
            <div className='h-full w-full rounded-sm' style={{ backgroundColor: colorToCSS(color) }} />
        </button>

)
}
