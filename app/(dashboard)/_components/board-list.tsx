'use client'
import { fetcher } from '@/lib/query/board.queies';
import BoardCard from './board-card'
import useSWR from 'swr';
import { useOrganization } from '@clerk/nextjs';
import NewBoard from './new-board';
import { IBoard } from '@/lib/db/schemas/board';

interface BoardListProps {
    searchParams: { search?: string, favorite?: string } | undefined
}

const BoardList = ({ searchParams }: BoardListProps) => {

    const { search, favorite } = searchParams || {}

    const { organization } = useOrganization();
    // TODO: API call to get boards
    const { data, error, isLoading } = useSWR(`/api/board/${organization?.id}`, fetcher);


    if (isLoading) {
        return (
            <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
                Loading...
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
        return (
            <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
                No Found Try search for something else
            </div>
        )
    }

    if (favorite && data?.data.length <= 0) {
        return (
            <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
                No Favroites
            </div>
        )
    }


    if (!organization || data?.data.length <= 0) {
        return (
            <div className='border-2 flex items-center justify-center border-black h-[calc(100vh-64px)]'>
                No Boards created yet
            </div>
        )
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
