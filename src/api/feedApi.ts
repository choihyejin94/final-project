import supabase from '../utils/supabase';

// 모든 피드 가져오는 API
export const fetchPosts = async () => {
  const { data, error } = await supabase.from('feeds').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 피드 데이터 하나 가져오는 API
export const fetchFeedId = async (id: string) => {
  const { data, error } = await supabase.from('feeds').select('*').eq('id', id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 피드 추가 API
export const addFeed = async ({ title, content, user_id }: { title: string; content: string; user_id: string }) => {
  const { data, error } = await supabase.from('feeds').insert({ title, content, user_id });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 피드 수정 API
export const updateFeed = async ({ title, content, feedId }: { title: string; content: string; feedId: string }) => {
  const { error } = await supabase.from('feeds').update({ title: title, content: content }).eq('id', feedId);
  if (error) {
    throw new Error(error.message);
  }
};
