'use client';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';
import { Camera, Color } from '@/types/canvas';
import { useMutation, useSelf } from '@liveblocks/react/suspense';
import React from 'react'
import { ColorPicker } from './color-picker';
import { Button } from '@/components/ui/button';
import { useDeleteLayer } from '@/hooks/use-delete-layer';
import { Trash2 } from 'lucide-react';

interface SelectionToolsProps {
    camera: Camera,
    setLastUsedColor:(color: Color) => void
}

const SelectionTools = ({camera, setLastUsedColor}:SelectionToolsProps) => {
    const selection = useSelf((me)=> me.presence.selection);

    const selectionBounds = useSelectionBounds();
    
    const deleteLayer = useDeleteLayer();

    const setFillColor = useMutation(({
        storage
    }, fill:Color)=>{

        const liveLayers = storage.get('layers');
        setLastUsedColor(fill)
        selection.forEach((layerId)=>{
            liveLayers.get(layerId)?.set('fill', fill)
        })

    },[selection, setLastUsedColor])
    
    if(!selectionBounds) return null;
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;


  return (
    <div className='flex gap-x-2 items-start absolute p-3 rounded-md bg-white shadow-md '
    style={{
        transform: `translate(
        calc(${x}px - 50%),
        calc(${y - 16}px - 100%))`
    }}
    >
        <ColorPicker onChange={setFillColor} />

        <Button className='w-8 h-8' variant={'board'} onClick={deleteLayer} asChild>
            <Trash2 />
        </Button>
    </div>
  )
}
   
export default SelectionTools
