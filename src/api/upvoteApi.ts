import supabase from '../utils/supabase';

export const fetchUpvotes = async (feedId: string) => {
  const { data, error } = await supabase.from('upvotes').select('*').eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addUpvote = async ({ user_id, feed_id }: { user_id: string; feed_id: string }) => {
  const { data, error } = await supabase.from('upvotes').insert([
    {
      user_id,
      feed_id
    }
  ]);
  if (error) {
    throw new Error(error.message);
  }
  return data!;
};

export const deleteUpvote = async ({ user_id, feed_id }: { user_id: string; feed_id: string }) => {
  const { error } = await supabase.from('upvotes').delete().match({ user_id, feed_id });
  if (error) {
    throw new Error(error.message);
  }
};