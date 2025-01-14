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
