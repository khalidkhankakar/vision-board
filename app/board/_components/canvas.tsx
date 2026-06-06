'use client';
import { nanoid } from 'nanoid'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useCanRedo, useCanUndo, useHistory, useMutation, useSelf } from '@liveblocks/react'
import { useOthersMapped, useStorage } from '@liveblocks/react/suspense'
import { Stage, Layer as KonvaLayer } from 'react-konva'

// Import Konva shapes to ensure they are registered
import "konva/lib/shapes/Rect";
import "konva/lib/shapes/Ellipse";
import "konva/lib/shapes/Path";

import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYHW, } from '@/types/canvas'
import { CursorPresence } from './cursor-presence'
import { cn, colorToCSS, connectionIdColor, findIntersectionlayerRectangle, getSvgPathFromStroke, penPointsToPathLayer, pointerEventToCameraPointer, resizeBounds } from '@/lib/utils'
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
  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 229, g: 231, b: 235 })
  const [stageSize, setStageSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 0, height: typeof window !== 'undefined' ? window.innerHeight : 0 })

  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const selections = useOthersMapped((other) => other.presence.selection)
  const pencilDraft = useSelf((me) => me.presence.pencilDraft)

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

  const layerIds = useStorage((root) => root.layerIds)
  const layers = useStorage((root) => root.layers)

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

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get('layers').toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current
      })
      const ids = findIntersectionlayerRectangle(layerIds, layers, origin, current)
      setMyPresence({ selection: ids })
    }, [layerIds])

  const startMultiSecltion = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, [setCanvasState])

  const startDrawing = useMutation(({ setMyPresence }, point: Point, pressure: number) => {
    setMyPresence({
      pencilDraft: [[point.x, point.y, pressure]],
      penColor: lastUsedColor
    })
  }, [lastUsedColor])

  const continueDrawing = useMutation(({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
    const { pencilDraft } = self.presence;
    if (canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft == null) return;
    setMyPresence({
      cursor: point,
      pencilDraft: pencilDraft.length > 0 && pencilDraft[pencilDraft.length - 1][0] === point.x && pencilDraft[pencilDraft.length - 1][1] === point.y ? pencilDraft : [...pencilDraft, [point.x, point.y, e.pressure]]
    })
  }, [canvasState.mode])

  const insertPath = useMutation(({ storage, self, setMyPresence }) => {
    const liveLayers = storage.get('layers')
    const { pencilDraft } = self.presence;
    if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
      setMyPresence({ pencilDraft: null })
      return;
    }
    const id = nanoid();
    liveLayers.set(
      id,
      new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
    )
    const liveLayerIds = storage.get('layerIds')
    liveLayerIds.push(id)
    setMyPresence({ pencilDraft: null })
    setCanvasState({ mode: CanvasMode.Pencil })
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

  const onPointerUp = useMutation(({ }, e: React.PointerEvent) => {
    const point = pointerEventToCameraPointer(e, camera)
    if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
      unSelectLayer()
      setCanvasState({ mode: CanvasMode.None })
    }
    else if (canvasState.mode === CanvasMode.Pencil) {
      insertPath()
    }
    else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point)
    }
    else {
      setCanvasState({ mode: CanvasMode.None })
    }
    history.resume()
  }, [camera, canvasState, history, insertLayer, insertPath])

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
    if (canvasState.mode === CanvasMode.Pressing) {
      startMultiSecltion(current, canvasState.origin)
    } else if (canvasState.mode === CanvasMode.SelectionNet) {
      updateSelectionNet(current, canvasState.origin)
    }
    else if (canvasState.mode === CanvasMode.Translating) {
      translateSelectedLayer(current)
    }
    else if (canvasState.mode === CanvasMode.Resizing) {
      resizeSelectedLayer(current)
    }
    else if (canvasState.mode === CanvasMode.Pencil) {
      continueDrawing(current, e)
    }
    setMyPresence({ cursor: current })
  }, [canvasState, camera, resizeSelectedLayer, translateSelectedLayer, updateSelectionNet, continueDrawing])

  const onPoinerDown = useCallback((e: React.PointerEvent) => {
    const point = pointerEventToCameraPointer(e, camera)
    if (canvasState.mode === CanvasMode.Inserting) return;
    if (canvasState.mode === CanvasMode.Pencil) {
      startDrawing(point, e.pressure)
      return;
    }
    setCanvasState({
      mode: CanvasMode.Pressing,
      origin: point
    })
  }, [camera, canvasState.mode, setCanvasState, startDrawing])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setCamera((prevCam) => ({
      x: prevCam.x - e.deltaX,
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

  const konvaLayerIds = useMemo(() => {
    return layerIds.filter((id) => {
        const layer = layers.get(id);
        return layer && (layer.type === LayerType.Rectangle || layer.type === LayerType.Ellipse || layer.type === LayerType.Path);
    });
  }, [layerIds, layers]);

  const svgLayerIds = useMemo(() => {
    return layerIds.filter((id) => {
        const layer = layers.get(id);
        return layer && (layer.type === LayerType.Text || layer.type === LayerType.Note);
    });
  }, [layerIds, layers]);

  return (
    <div className='relative h-full w-full overflow-hidden bg-[var(--color-canvas)]'>
      <Info id={id} />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} undo={history.undo} redo={history.redo} />
      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />
      <Participants />

      {/* Konva Layer for performant shapes */}
      <Stage 
        width={stageSize.width} 
        height={stageSize.height}
        onMouseDown={(e) => onPoinerDown(e.evt as unknown as React.PointerEvent)}
        onWheel={(e) => onWheel(e.evt as unknown as React.WheelEvent)}
        className="absolute top-0 left-0"
      >
        <KonvaLayer x={camera.x} y={camera.y}>
          {konvaLayerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsColorSelection[layerId]}
            />
          ))}
        </KonvaLayer>
      </Stage>

      {/* SVG Layer for Text, Notes, and UI */}
      <svg
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
        className={cn(
          'absolute top-0 left-0 h-[100vh] w-[100vw] touch-none',
          canvasState.mode === CanvasMode.None ? 'pointer-events-none' : 'pointer-events-auto'
        )}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {svgLayerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsColorSelection[layerId]}
            />
          ))}
          
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          
          {canvasState.mode == CanvasMode.SelectionNet && canvasState.current != null && (
            <rect
              className='fill-[var(--color-accent)]/10 stroke-[var(--color-accent)] stroke-1'
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}

          <CursorPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <path
              fill={colorToCSS(lastUsedColor)}
              d={getSvgPathFromStroke(pencilDraft)}
            />
          )}
        </g>
      </svg>
    </div>
  )
}

export default Canvas
