import React from 'react'
type SearchParams =  Promise<{ search?:string, favorite?:string }>
const Home = async ({searchParams}:{searchParams?:SearchParams}) => {
  const favorite =  (await searchParams)?.favorite
  const search =  (await searchParams)?.search
  const data = []
  if (search && data.length<= 0) {
    return (
      <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
      No Found Try search for something else
    </div>
    )
  }

  if (favorite && data.length<= 0) {
    return (
      <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
      No Favroites
    </div>
    )
  }


  if (data.length<= 0) {
    return (
      <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
      No Boards created yet
    </div>
    )
  }

  return (
    <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
      Home V-Board
    </div>
  )
}

export default Home
