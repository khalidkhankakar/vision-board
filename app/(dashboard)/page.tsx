import BoardList from './_components/board-list'

type SearchParams =  Promise<{ search?:string, favorite?:string }>
const Home = async ({searchParams}:{searchParams?:SearchParams}) => {

  const favorite =  (await searchParams)?.favorite
  const search =  (await searchParams)?.search

  return (
    <div className='h-[calc(100vh-64px)] overflow-y-scroll '>
      <BoardList searchParams={{ search, favorite} }  />
    </div>
  )
}

export default Home
