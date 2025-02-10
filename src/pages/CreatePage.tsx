import FeedForm from '../components/FeedForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFeed } from '../api/feedApi';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // feed 추가 기능
  const addFeedMutation = useMutation({
    mutationFn: addFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      alert('글 작성이 완료되었습니다 !');
      navigate('/');
    }
  });

  return (
    <div>
      <div>
        <h3 className="font-bold text-3xl mb-6">Add a Post</h3>
      </div>
      <FeedForm mode='create' addFeedMutation={addFeedMutation} />
    </div>
  );
}
