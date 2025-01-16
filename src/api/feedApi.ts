import supabase from '../utils/supabase';

export const fetchPosts = async () => {
    const { data, error } = await supabase.from('feeds').select('*');
    if (error) {
        throw new Error(error.message);
    } return data;
};

export const fetchFeedId = async (id : string) => {
  const { data, error } = await supabase.from('feeds').select('*').eq('id', id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};