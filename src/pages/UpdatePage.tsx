import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FeedForm from '../components/FeedForm';
import { fetchFeedId, updateFeed } from '../api/feedApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Database } from '../types/supabase';

type FeedIdProps = Database['public']['Tables']['feeds']['Row'];

export default function UpdatePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 기존 feed 내용 불러오기
  const { data, isLoading, isError } = useQuery<FeedIdProps>({
    queryKey: ['feed', id],
    queryFn: () => fetchFeedId(id!)
  });

  const initialData = {
    title: data?.title || '',
    content: data?.content || ''
  };

  // feed 수정 mutation
  const updateFeedMutation = useMutation({
    mutationFn: updateFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      alert('글 수정이 완료되었습니다 !');
      navigate('/');
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <div>
        <h3 className="font-bold text-3xl mb-6">Update a Post</h3>
      </div>
      <FeedForm mode="update" updateFeedMutation={updateFeedMutation} initialData={initialData} />
    </div>
  );
}
