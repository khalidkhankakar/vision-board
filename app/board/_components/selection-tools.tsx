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
        for (const layerId of selection) {
            const layer = liveLayers.get(layerId)
            if (layer) {
                layer.update({ fill })
            }
        }

    },[selection, setLastUsedColor])
    
    if(!selectionBounds) return null;
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;


  return (
    <div className='absolute z-30 flex items-start gap-x-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] p-2 shadow-sm'
    style={{
        transform: `translate(
        calc(${x}px - 50%),
        calc(${y - 16}px - 100%))`
    }}
    >
        <ColorPicker onChange={setFillColor} />

        <Button className='h-8 w-8 rounded-md p-0 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10' variant={'board'} onClick={deleteLayer}>
            <Trash2 className='h-4 w-4' />
        </Button>
    </div>
  )
}
   
export default SelectionTools
