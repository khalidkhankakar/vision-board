import React from 'react'
import ToolbarButton from './toolbar-button'
import { CaseSensitive, Circle, MousePointer2, Pen, Redo2, Square, StickyNote, Undo2 } from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '@/types/canvas'


interface ToolbarProps {
  canvasState: CanvasState
  setCanvasState: (newState: CanvasState) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo
}: ToolbarProps) => {
  return (
    <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 px-3 sm:bottom-auto sm:left-3 sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:px-0'>
      <div className="flex items-center gap-1 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] p-1 shadow-sm sm:flex-col">

        <ToolbarButton onclick={() => setCanvasState({ mode: CanvasMode.None })} icon={MousePointer2} label='Select' isDisabled={false} isActive={
          canvasState.mode === CanvasMode.None ||
          canvasState.mode === CanvasMode.SelectionNet ||
          canvasState.mode === CanvasMode.Translating ||
          canvasState.mode === CanvasMode.Pressing ||
          canvasState.mode === CanvasMode.Resizing
        } />

        <ToolbarButton
          icon={CaseSensitive} label='Text' isDisabled={false}
          onclick={() => setCanvasState({
            mode: CanvasMode.Inserting
            , layerType: LayerType.Text
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          } />

        <ToolbarButton
          icon={StickyNote} label='Sticky Note' isDisabled={false} onclick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note })} isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          } />

        <ToolbarButton
          icon={Circle} label='Ellipse' isDisabled={false} onclick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse })} isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          } />

        <ToolbarButton icon={Square} label='Square' isDisabled={false} onclick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle })} isActive={
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Rectangle
        } />

        <ToolbarButton icon={Pen} label='Pen' isDisabled={false} onclick={() => setCanvasState({ mode: CanvasMode.Pencil })} isActive={canvasState.mode === CanvasMode.Pencil} />
      </div>
      <div className="flex items-center rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] p-1 shadow-sm sm:flex-col">
        <ToolbarButton onclick={undo} icon={Undo2} label='Undo' isDisabled={!canUndo} isActive={canUndo} />

        <ToolbarButton onclick={redo} icon={Redo2} label='Redo' isDisabled={!canRedo} isActive={canRedo} />
      </div>
    </div>
  )
}

export default Toolbar
