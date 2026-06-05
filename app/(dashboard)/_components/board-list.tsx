'use client'
import { fetcher } from '@/lib/query/board.queies';
import BoardCard from './board-card'
import useSWR from 'swr';
import { useOrganization } from '@clerk/nextjs';
import NewBoard from './new-board';
import { IBoard } from '@/lib/db/schemas/board';
import NoResult from './no-result'  // Still used for search/favorite no results

interface BoardListProps {
    searchParams: { search?: string, favorite?: string } | undefined
}

type BoardListItem = IBoard & {
    isFavorite: boolean
}

const BoardList = ({ searchParams }: BoardListProps) => {
    const { search, favorite } = searchParams || {}
    const { organization } = useOrganization();

    // Only fetch when organization is loaded
    const endpoint = organization?.id ? `/api/board/${organization.id}?favorite=${favorite}&search=${search}` : null

    const { data, error, isLoading } = useSWR<{ data: BoardListItem[] }>(endpoint, fetcher);
    const boards = data?.data ?? []
    const title = searchParams?.favorite ? 'Favorite Boards' : 'Team Boards'
    const subtitle = searchParams?.favorite
        ? 'Boards you marked for quick return.'
        : 'Create, open, and organize collaborative drawing spaces.'

    const renderHeader = () => (
        <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
            <div className='min-w-0'>
                <h1 className='text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl'>{title}</h1>
                <p className='mt-1 max-w-2xl text-sm text-[var(--color-ink-2)]'>{subtitle}</p>
            </div>
            <div className='rounded-full border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium text-[var(--color-ink-2)] shadow-sm'>
                {boards.length} boards
            </div>
        </div>
    )

    const gridClass = 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'

    // Wait for organization to load
    if (!organization) {
        return (
            <div className='mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8'>
                {renderHeader()}
                <div className={gridClass}>
                    <NewBoard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8'>
                {renderHeader()}
                <div className={gridClass}>
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
            <div className='flex min-h-[calc(100vh-64px)] items-center justify-center px-4'>
                <div className='max-w-md rounded-xl border border-[var(--color-rule)] bg-[var(--color-card)] p-6 text-center shadow-sm'>
                    <h2 className='text-lg font-semibold text-[var(--color-ink)]'>Boards could not load</h2>
                    <p className='mt-2 text-sm text-[var(--color-ink-2)]'>Refresh the page or check your organization access.</p>
                </div>
            </div>
        );
    }

    if (search && boards.length <= 0) {
        return <NoResult img='/assets/no result.svg' title='No Result' description='Try search for something else' />
    }

    if (favorite && boards.length <= 0) {
        return <NoResult img='/assets/no fav.svg' title='No Favorites' description='Try some favorting boards' />
    }


    if (boards.length <= 0) {
        return (
            <div className='mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8'>
                {renderHeader()}
                <div className={gridClass}>
                    <NewBoard />
                </div>
            </div>
        )
    }


    return (
        <div className='mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8'>
            {renderHeader()}
            <div className={gridClass}>
                <NewBoard />
                {
                    boards.map((board) => (<BoardCard
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
