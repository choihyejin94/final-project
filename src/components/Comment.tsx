import { useMutation, useQueryClient } from '@tanstack/react-query';
import profile_image from '../../public/image/profile_img.jpg';
import { useAuthStore } from '../stores/useAuthStore';
import { CommentProps } from '../types/commentTypes';
import { deleteComment } from '../api/commentApi';

const Comment = ({ comment }: { comment: CommentProps }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  const handleDelete = () => {
    if (window.confirm(`"${comment.content}" 댓글을 삭제하시겠습니까 ?`)) {
      deleteMutation.mutate(comment.id);
      window.alert('삭제했습니다 !')
    }
    else {
      window.alert('취소 버튼을 클릭했습니다 !')
    }
  }

  return (
    <>
      <div className="flex justify-between gap-8 mb-2 border-b border-b-stone-300 py-6">
        <div className="flex">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img src={profile_image} alt="profile_image" className="w-full h-full object-cover" />
          </div>
          <div className="ml-5 flex-grow">
            <h4 className="font-bold text-lg">{comment.user?.nickname}</h4>
            <p className="mt-3 ">{comment.content}</p>
          </div>
        </div>
        {user?.id === comment.user_id && (
          <div className="flex flex-col items-end gap-3 mr-3">
            <button className="border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
