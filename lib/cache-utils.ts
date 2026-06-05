import { mutate } from 'swr';

/**
 * Revalidates all board-related cache for a given organization
 * Matches: /api/board/{orgId}, /api/board/{orgId}?search=...
 * /api/board/{orgId}?favorite=true, etc.
 */
export const revalidateBoardsCache = (organizationId: string | undefined) => {
  if (!organizationId) return;

  mutate((key) => {
    // Match `/api/board/{organizationId}` with any query params
    const pattern = new RegExp(`^/api/board/${organizationId}($|\\?)`);
    return pattern.test(key as string);
  });
};

/**
 * Revalidates specific board data in cache
 */
export const revalidateBoardCache = (boardId: string) => {
  mutate((key) => {
    return (key as string)?.includes(`/api/board/${boardId}`);
  });
};
