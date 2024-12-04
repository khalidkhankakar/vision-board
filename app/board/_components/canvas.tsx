'use client';
import { nanoid } from 'nanoid'
import React, { useCallback, useMemo, useState } from 'react'
import { useCanRedo, useCanUndo, useHistory, useMutation } from '@liveblocks/react'
import { useOthersMapped, useStorage } from '@liveblocks/react/suspense'

import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYHW, } from '@/types/canvas'
import { CursorPresence } from './cursor-presence'
import { connectionIdColor, pointerEventToCameraPointer, resizeBounds } from '@/lib/utils'
import Info from './info'
import Toolbar from './toolbar'
import Participants from './participants'
import { LiveObject } from '@liveblocks/client';
import LayerPreview from './layer-preview';
import { SelectionBox } from './selection-box';
import SelectionTools from './selection-tools';


const MAX_LAYERS = 100

const Canvas = ({ id }: { id: string }) => {

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 0, g: 0, b: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()


  const selections = useOthersMapped((other) => other.presence.selection)

  const layerIdsColorSelection = useMemo(() => {
    const layerIdsColorSelection: Record<string, string> = {}
    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdsColorSelection[layerId] = connectionIdColor(connectionId)
      }
    }
    return layerIdsColorSelection
  }, [selections])

  const unSelectLayer = useMutation(({ self, setMyPresence }) => {

    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }

  }, [])

  // Storage for layers
  const layerIds = useStorage((root) => root.layerIds)

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note, position: Point) => {

    const liveLayers = storage.get('layers')
    if (liveLayers.size > MAX_LAYERS) return;


    const liveLayersIds = storage.get('layerIds')

    const layerId = nanoid();

    const newLayer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      width: 100,
      height: 100,
      fill: lastUsedColor
    })

    liveLayersIds.push(layerId)
    liveLayers.set(layerId, newLayer)

    setMyPresence({ selection: [layerId] }, { addToHistory: true })
    setCanvasState({ mode: CanvasMode.None })

  }, [lastUsedColor])


  const translateSelectedLayer = useMutation((
    { storage, self },
    point: Point
  ) => {
    if (canvasState.mode !== CanvasMode.Translating) return;

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get('layers')

    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id)
      if (layer) {
        layer.update({
          x: layer.get('x') + offset.x,
          y: layer.get('y') + offset.y
        })
      }
    }

    setCanvasState({ mode: CanvasMode.Translating, current: point })

  }, [canvasState])



  const onPointerUp = useMutation(({ }, e) => {
    const point = pointerEventToCameraPointer(e, camera)


    if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
      // Unselect the layer
      unSelectLayer()
      setCanvasState({ mode: CanvasMode.None })

    }
    else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point)
    }
    else {
      setCanvasState({ mode: CanvasMode.None })
    }
    history.resume()
  }, [camera, canvasState, history, insertLayer])

  const resizeSelectedLayer = useMutation((
    { storage, self },
    point: Point
  ) => {

    if (canvasState.mode !== CanvasMode.Resizing) return;

    const bounds = resizeBounds(canvasState.initialBounds, canvasState.cornor, point)

    const liveLayers = storage.get('layers')

    const layer = liveLayers.get(self.presence.selection[0])

    if (layer) {
      layer.update(bounds)
    }

  }, [canvasState])


  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCameraPointer(e, camera);
    if (canvasState.mode === CanvasMode.Translating) {
      translateSelectedLayer(current)
    }
    else if (canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(current)
    }
    setMyPresence({ cursor: current })
  }, [canvasState, camera, resizeSelectedLayer, translateSelectedLayer])


  const onPoinerDown = useCallback((e: React.PointerEvent) => {
    const point = pointerEventToCameraPointer(e, camera)
    if (canvasState.mode === CanvasMode.Inserting) return;

    // TODO: add case for drawing the pencil

    setCanvasState({
      mode: CanvasMode.Pressing,
      origin: point
    })

  }, [camera, canvasState.mode, setCanvasState])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setCamera((prevCam) => ({
      x: prevCam.x - e.deltaY,
      y: prevCam.y - e.deltaY
    }))
  }, [])

  const onLayerPointerDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string
  ) => {
    if (canvasState.mode === CanvasMode.Inserting || canvasState.mode === CanvasMode.Pencil) return;

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCameraPointer(e, camera)
    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
    }
    setCanvasState({ mode: CanvasMode.Translating, current: point })

  }, [setCanvasState, camera, history, canvasState.mode])





  const onResizeHandlePointerDown = useCallback((
    cornor: Side,
    initialBounds: XYHW,
  ) => {


    history.pause();

    setCanvasState({
      mode: CanvasMode.Resizing,
      initialBounds,
      cornor
    })

  }, [history])

  return (
    <div className='h-full w-full bg-slate-200 relative'>
      <Info id={id} />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} undo={history.undo} redo={history.redo} />

      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />

      <Participants />
      {/* by this when other people are in the room show in real time cursor presence */}
      <svg
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        onPointerDown={onPoinerDown}
        className='w-[100vw] h-[100vh]'>
        <g
          style={{
            transform: `translate(${camera.x}px ${camera.y}px)`
          }}
        >

          {
            layerIds.map((layerId) => (
              <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layerIdsColorSelection[layerId]}

              />
            ))
          }
          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />

          <CursorPresence />
        </g>
      </svg>
    </div>
  )
}

export default Canvas
