
interface BoardProps {
    params:Promise<{id:string}> 
}

const Board = async({params}:BoardProps) => {

    const boardId = (await params).id

  return (
    <div className="h-full w-full">
      <h1 className="text-xl font-bold">boardId {boardId}</h1>
    </div>
  )
}

export default Board
