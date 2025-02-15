import supabase from '../utils/supabase';

// feed id에 맞는 좋아요 가져오는 API
export const fetchUpvotes = async (feedId: string) => {
  const { data, error } = await supabase.from('upvotes').select('*').eq('feed_id', feedId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 좋아요 추가 API
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

// 좋아요 삭제 API
export const deleteUpvote = async ({ user_id, feed_id }: { user_id: string; feed_id: string }) => {
  const { error } = await supabase.from('upvotes').delete().match({ user_id, feed_id });
  if (error) {
    throw new Error(error.message);
  }
};