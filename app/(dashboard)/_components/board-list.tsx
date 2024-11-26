'use client'
import { fetcher } from '@/lib/query/board.queies';
import BoardCard from './board-card'
import useSWR from 'swr';
import { useOrganization } from '@clerk/nextjs';
import NewBoard from './new-board';
import { IBoard } from '@/lib/db/schemas/board';
import NoResult from './no-result';

interface BoardListProps {
    searchParams: { search?: string, favorite?: string } | undefined
}

const BoardList = ({ searchParams }: BoardListProps) => {
    const { search, favorite } = searchParams || {}
    const { organization } = useOrganization();

    const endpoint = `/api/board/${organization?.id}?favorite=${favorite}&search=${search}`


    const { data, error, isLoading } = useSWR(endpoint, fetcher);


    if (isLoading) {
        return (
            <div className='m-4'>
                <h1 className='text-3xl font-semibold m-3'>{searchParams?.favorite ? 'Favorite Boards' : 'Team Boards'} </h1>
                <div className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-5 '>
                    <NewBoard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />

                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
                something went wrong
            </div>
        );
    }

    if (search && data?.data.length <= 0) {
        return <NoResult img='/assets/no result.svg' title='No Result' description='Try search for something else' />
    }

    if (favorite && data?.data.length <= 0) {
        return <NoResult img='/assets/no fav.svg' title='No Favorites' description='Try some favorting boards' />
    }


    if (!organization || data?.data.length <= 0) {
        return <NoResult img='/assets/no boards.svg' title='No Boards' description='Try to create a board. Get started' />
    }


    return (
        <div className='m-4'>
            <h1 className='text-3xl font-semibold m-3'>{searchParams?.favorite ? 'Favorite Boards' : 'Team Boards'} </h1>
            <div className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  gap-5 '>
                <NewBoard />
                {
                    data?.data?.map((board) => (<BoardCard
                        key={board.id}
                        id={board.id}
                        authorName={board.authorName}
                        createdAt={board.createdAt}
                        isFavorite={board.isFavorite}
                        title={board.title}
                        authorId={board.authorId}
                    />))
                }
            </div>
        </div>
    )
}

export default BoardList
