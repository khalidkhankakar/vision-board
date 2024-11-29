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
    <div className='absolute top-2 flex items-center gap-x-2 right-3 shadow-md rounded-md bg-white py-2 px-4'>
      {
        others?.slice(0, MAX_SHOWING_PARTICIPANTS).map(({connectionId, info})=>(
          <UserAvatar key={connectionId} borderColor={connectionIdColor(connectionId)} src={info.picture} name={info.name}  />
        ))
      }
      {
        
          <UserAvatar  borderColor={connectionIdColor(self.connectionId)} src={self.info.picture} name={self.info.name}  />
      }
        { isMoreParticipants &&
        
        <UserAvatar name={'A'}  />
    }
    </div>
  )
}

export default Participants
