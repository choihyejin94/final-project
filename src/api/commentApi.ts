import supabase from '../utils/supabase';

// feed id에 맞는 모든 댓글 가져오는 API
export const fetchComments = async (feedId: string) => {
  const { data, error } = await supabase.from('comments').select('*').eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// feed id에 맞는 댓글 하나 가져오는 API
export const fetchCommentId = async (feedId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`*, user: user_id(id,email,nickname)`)
    .eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 댓글 추가 API
export const addComment = async ({
  content,
  user_id,
  feed_id
}: {
  content: string;
  user_id: string;
  feed_id: string;
}) => {
  const { data, error } = await supabase.from('comments').insert({ content, user_id, feed_id });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 댓글 삭제 API
export const deleteComment = async (commentId: string) => {
  const { error } = await supabase.from('comments').delete().eq('id', commentId);
  if (error) {
    throw new Error(error.message);
  }
};

// 댓글 수정 API
export const updateComment = async ({ commentId, content }: { commentId: string; content: string }) => {
  const { error } = await supabase.from('comments').update({ content: content }).eq('id', commentId);
  if (error) {
    throw new Error(error.message);
  }
  return new Promise((res) => res(true));
};
