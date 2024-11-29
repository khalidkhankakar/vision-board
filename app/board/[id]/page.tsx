import Room from "@/components/shared/room"

import Canvas from "../_components/canvas"
import Loading from "../_components/loading"

interface BoardProps {
  params: Promise<{ id: string }>
}

const Board = async ({ params }: BoardProps) => {

  const boardId = (await params).id
  return (
    <Room id={boardId} fallback={<Loading />}>
      <Canvas id={boardId} />
    </Room>

  )
}

export default Board
