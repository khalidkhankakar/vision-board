'use client'

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

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
      <RoomProvider  initialPresence={{  cursor:null}} id={id}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}

export default Room
