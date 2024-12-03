'use client';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';
import { LayerType, Side, XYHW } from '@/types/canvas';
import { useSelf, useStorage } from '@liveblocks/react/suspense';
import React, { memo } from 'react'

interface SelectionBoxProps {
    onResizeHandlePointerDown: (cornor: Side, initialBounds: XYHW) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {

    const myLayerId = useSelf((me) => me.presence.selection.length === 1 ? me.presence.selection[0] : null)

    const isShowHandles = useStorage((root) => myLayerId && root.layers.get(myLayerId)?.type != LayerType.Path)

    const bounds = useSelectionBounds()

    if (!bounds) return null

    return (
        <>
            <rect
                className='full-transparent stroke-blue-500 start-1 pointer-events-none'
                style={{
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`
                }}
                y={0}
                x={0}
                width={bounds.width}
                height={bounds.height}
            />

            {isShowHandles && (
                <>
                    {/* 1 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Top + Side.Left , bounds)
                        }}
                    />
                    {/* 2 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'ns-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Top , bounds)
                        }}
                    />
                    {/* 3 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nesw-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Top + Side.Right , bounds)

                        }}
                    />
                    {/* 4 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'ew-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Right , bounds)
                            
                        }}
                    />
                    {/* 5 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Bottom + Side.Right , bounds)
                        }}
                    />
                    {/* 6 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'ns-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - bounds.width / 2 + bounds.width}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Bottom , bounds)

                        }}
                    />

                   
                    {/* 7 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'nesw-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Bottom + Side.Left , bounds)
                        }}
                    />
                    {/* 8 */}
                    <rect
                        className='fill-white stroke-1 stroke-blue-500 '
                        x={0}
                        y={0}
                        style={{
                            cursor: 'ew-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px)`

                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            onResizeHandlePointerDown(Side.Left , bounds)

                        }}
                    />
                </>
            )}
        </>
    )
})

SelectionBox.displayName = 'SelectionBox'