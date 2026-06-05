'use client'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import React from 'react'
import UserAvatar from './user-avatar';
import { connectionIdColor } from '@/lib/utils';

const MAX_SHOWING_PARTICIPANTS = 3;

const Participants = () => {
  const others = useOthers()
  const self = useSelf()
  const isMoreParticipants = others?.length > MAX_SHOWING_PARTICIPANTS
  return (
    <div className='absolute right-3 top-3 z-20 flex items-center gap-x-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 shadow-sm'>
      {
        others?.slice(0, MAX_SHOWING_PARTICIPANTS).map(({connectionId, info})=>(
          <UserAvatar key={connectionId} borderColor={connectionIdColor(connectionId)} src={info.picture} name={info.name}  />
        ))
      }
      {
        
          <UserAvatar  borderColor={connectionIdColor(self.connectionId)} src={self.info.picture} name={self.info.name}  />
      }
        { isMoreParticipants &&
        
        <UserAvatar name={`+${others.length - MAX_SHOWING_PARTICIPANTS}`}  />
    }
    </div>
  )
}

export default Participants
