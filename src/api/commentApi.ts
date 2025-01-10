import supabase from '../utils/supabase';

export const fetchComments = async (feedId : string) => {
  const { data, error } = await supabase.from('comments').select('*').eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
