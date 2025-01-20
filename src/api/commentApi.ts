import supabase from '../utils/supabase';

export const fetchComments = async (feedId : string) => {
  const { data, error } = await supabase.from('comments').select('*').eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchCommentId = async (feedId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`*, user: user_id(id,email,nickname)`)
    .eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  console.log({ data });
  return data;
};

export const addComment = async ({ content, user_id, feed_id }: {content:string, user_id:string, feed_id:string}) => {
  const { data, error } = await supabase.from('comments').insert({ content, user_id, feed_id });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase.from('comments').delete().eq('id', commentId);
  if (error) {
    throw new Error(error.message);
  }
};