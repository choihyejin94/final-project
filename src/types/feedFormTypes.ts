import { UseMutationResult } from '@tanstack/react-query';

export interface MutationProps {
  addFeedMutation?: UseMutationResult<null, Error, { title: string; content: string; user_id: string }, unknown>;
  updateFeedMutation?: UseMutationResult<void, Error, { title: string; content: string; feedId: string }, unknown>;
  mode: 'create' | 'update';
  initialData?: { title: string; content: string };
}
