'use client'
import Info from './info'
import Toolbar from './toolbar'
import Participants from './participants'
import React, { useCallback, useState } from 'react'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory, useMutation } from '@liveblocks/react'
import {CursorPresence} from './cursor-presence'
import { pointerEventToCameraPointer } from '@/lib/utils'

const Canvas = ({id}: {id: string}) => {

  const [canvasState, setCanvasState]  = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const [camera, setCamera] = useState<Camera>({x:0, y:0})


  const onPointerMove = useMutation(({setMyPresence}, e:React.PointerEvent)=>{
    e.preventDefault();
    const current = pointerEventToCameraPointer(e,camera)
    setMyPresence({cursor:current})
  },[])


  const onWheel = useCallback((e:React.WheelEvent)=>{
    e.preventDefault();
    setCamera((prevCam)=>({
      x:prevCam.x - e.deltaY,
      y:prevCam.y - e.deltaY
    }))
  },[])


  return (
    <div className='h-full w-full bg-slate-200 relative'>
      <Info id={id} />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} undo={history.undo} redo={history.redo} />
      <Participants />
      {/* by this when other people are in the room show in real time cursor presence */}
      <svg
      onPointerMove={onPointerMove}
      onWheel={onWheel}
      className='w-[100vw] h-[100vh]'>
        <g>
          <CursorPresence />
        </g>
      </svg>
    </div>
  )
}

export default Canvas
