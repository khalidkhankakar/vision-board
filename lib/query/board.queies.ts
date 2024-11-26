export const createBoard = async () => {
    try {
        const res = await fetch(`/api/board/`, {
            method: "POST",
            body: JSON.stringify(
                {

                    authorId: "_id124kdh2",
                    authorName: "khadf",
                    orgId: "org_2p3mp3NzXx4CBqC82RzIlv25zP4",
                    title: "Secondd board"

                }
            )
        })
        const data  = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch boards')
    }
}
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const deleteBoard = (url: string) => fetch(url, { method: 'DELETE' }).then((res) => res.json());
export const renameBoard = (url: string, { arg }: { arg: { title: string }}) => fetch(url, { 
    body: JSON.stringify({ title:arg.title }),
    method: 'PUT' }).then((res) => res.json());

export const handleFavAndUnFav = (url: string, { arg }: { arg: { userId: string, boardId: string, orgId: string }}) => fetch(url, { 
        body: JSON.stringify({
             userId:arg.userId ,
             boardId:arg.boardId,
             orgId:arg.orgId

}),
        method: 'POST' }).then((res) => res.json().catch((e) => console.error(e)));
