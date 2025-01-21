import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { addFeed } from '../api/feedApi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const FeedForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // feed 추가 기능
  const addFeedMutation = useMutation({
    mutationFn: addFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      alert('글 작성이 완료되었습니다 !');
      navigate('/');
    }
  });

  const handleAddsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.id) {
      addFeedMutation.mutate({ title, content, user_id: user.id });
    } else {
      alert('로그인 후 이용해주세요 !');
    }
  };

  return (
    <form onSubmit={handleAddsubmit}>
      <div className="bg-white border border-gray rounded-md flex flex-col justify-start p-8 mb-6 w-[70rem] shadow-lg">
        <div className="mb-5">
          <h4 className="font-bold text-xl mb-2">Title</h4>
          <input
            type={'textarea'}
            placeholder={'Title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg w-[66rem] h-12 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div>
          <h5 className="font-bold text-xl mb-2">Content</h5>
          <input
            type={'textarea'}
            placeholder={'POST CONTENT'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg w-[66rem] h-72 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div className="flex justify-end">
          <button className="border text-lg w-16 h-8 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer">
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedForm;
