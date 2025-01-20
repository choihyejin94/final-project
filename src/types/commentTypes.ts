export type UserProps = {
  id: string;
  email: string;
  nickname: string;
};

export type CommentProps = {
  content: string | null;
  created_at: string;
  feed_id: string | null;
  id: string;
  user_id: string | null;
  user?: UserProps;
};
