'use client'

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface RoomProps{
    id:string,
    children: ReactNode
    fallback: ReactNode
}

const Room = ({
    id,
    children,
    fallback
}:RoomProps) => {
  return (
    <LiveblocksProvider 
    throttle={16}
    authEndpoint={'/api/liveblocks-auth'}>
      <RoomProvider
        initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
        }}
        initialPresence={{cursor:null, selection:[]}} id={id}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}

export default Room
