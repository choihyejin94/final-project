import supabase from '../utils/supabase';

export const fetchUpvotes = async (feedId : string) => {
  const { data, error } = await supabase.from('upvotes').select('*').eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
