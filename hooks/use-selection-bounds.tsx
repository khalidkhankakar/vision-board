import { Layer, XYHW } from "@/types/canvas";
import {  shallow, useSelf, useStorage } from "@liveblocks/react/suspense";



const boundingBox = (layers:Layer[]):XYHW | null => {
    const first = layers[0];
    if(!first) return null

    let left = first.x;
    let top = first.y;
    let right = first.x + first.width;
    let bottom = first.y + first.height;

    for( let i =1; i < layers.length; i++) {
        const {x, y, width, height} = layers[i];


        if(left>x) left = x;
        if(top>y) top = y;
        if(right<x+width) right = x+width;
        if(bottom<y+height) bottom = y+height;
    }
    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
    }
}

export const useSelectionBounds=()=>{
    const selection = useSelf((me)=>me.presence.selection)

    return useStorage((root)=>{
        const selectedLayers = selection.map((layerId)=>root.layers.get(layerId)!).filter(Boolean)

        return boundingBox(selectedLayers)
    }, shallow)
}