import BoardList from './_components/board-list'

type SearchParams =  Promise<{ search?:string, favorite?:string }>
const Home = async ({searchParams}:{searchParams?:SearchParams}) => {

  const favorite =  (await searchParams)?.favorite
  const search =  (await searchParams)?.search

  return (
    <div className='min-h-0 flex-1 overflow-y-auto overflow-x-clip'>
      <BoardList searchParams={{ search, favorite} }  />
    </div>
  )
}

export default Home
