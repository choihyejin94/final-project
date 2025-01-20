import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api/commentApi';
import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useParams } from 'react-router-dom';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { id } = useParams();

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setComment('');
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.id) {
      addCommentMutation.mutate({ content: comment, user_id: user.id, feed_id: id! });
    } else {
      alert("로그인 후 이용해주세요 !")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white border border-gray rounded-md flex flex-col p-8 mb-6 w-[70rem] shadow-lg">
        <div>
          <div className="flex justify-between items-center">
            <p className="font-bold ml-2 my-3 text-lg">Write a Comment</p>
            <button className="border text-lg w-16 h-8 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer">
              Write
            </button>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="YOUR COMMENT"
            required
            className="border border-gray-200 rounded-lg w-[66rem] h-[100px] p-3 resize-none"
          />
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
