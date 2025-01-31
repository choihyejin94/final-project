import { useMutation, useQueryClient } from '@tanstack/react-query';
import profile_image from '../../public/image/profile_img.jpg';
import { useAuthStore } from '../stores/useAuthStore';
import { CommentProps } from '../types/commentTypes';
import { deleteComment, updateComment } from '../api/commentApi';
import { useState } from 'react';

const Comment = ({ comment }: { comment: CommentProps }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isEditng, setIsEditing] = useState(false);
  const [updateContent, setUpdateContent] = useState<string>(comment.content || '');

  // 댓글 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  const handleDelete = () => {
    if (window.confirm(`"${comment.content}" 댓글을 삭제하시겠습니까 ?`)) {
      deleteMutation.mutate(comment.id);
      window.alert('삭제했습니다 !');
    } else {
      window.alert('취소 버튼을 클릭했습니다 !');
    }
  };

  // 댓글 수정
  const updateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setIsEditing(false);
    }
  });

  // 댓글 수정 완료 버튼에 적용
  const handleUpdate = () => {
    updateMutation.mutate({ commentId: comment.id, content: updateContent });
  };

  return (
    <>
      <div className="flex justify-between gap-8 mb-2 border-b border-b-stone-300 py-6">
        <div className="flex">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img src={profile_image} alt="profile_image" className="w-full h-full object-cover" />
          </div>
          <div className="ml-5 flex-grow">
            <h4 className="font-bold text-lg">{comment.user?.nickname}</h4>
            {isEditng ? (
              <div className="flex gap-2">
                <textarea
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  className="border border-gray-200 rounded-lg w-[56rem] h-[80px] p-3 resize-none"
                />
                <div className="flex flex-col items-end gap-3 mr-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
                  >
                    Cancle
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-3 ">{comment.content}</p>
            )}
          </div>
        </div>
        {user?.id === comment.user_id && (
          <div className="flex flex-col items-end gap-3 mr-3">
            {!isEditng ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
