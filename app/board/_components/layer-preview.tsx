import { LayerType } from '@/types/canvas'
import { useStorage } from '@liveblocks/react/suspense'
import React from 'react'
import RectangleLayerInsert from './rectangle-layer'
import EllipseLayerInsert from './ellipse-layer'
import TextLayerInsert from './text-layer'
import NoteLayerInsert from './note-layer'

interface LayerPreviewProps {
    id: string
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}
const LayerPreview = ({id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {

    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) return null

    switch (layer?.type) {
        case LayerType.Rectangle:
            return <RectangleLayerInsert
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />
        case LayerType.Ellipse:
            return <EllipseLayerInsert
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />
        case LayerType.Text:
            return <TextLayerInsert
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />
        case LayerType.Note:
            return <NoteLayerInsert
                id={id}
                layer={layer}
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
            />

        default:
            return null
    }
}

export default LayerPreview
