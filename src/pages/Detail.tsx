import Feed from '../components/Feed';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteFeed, fetchFeedId } from '../api/feedApi';
import { Database } from '../types/supabase';
import { fetchCommentId } from '../api/commentApi';
import { useAuthStore } from '../stores/useAuthStore';

type FeedIdProps = Database['public']['Tables']['feeds']['Row'];
type CommentIdProps = Database['public']['Tables']['comments']['Row'];

export default function Detail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data } = useQuery<FeedIdProps>({
    queryKey: ['feed', id],
    queryFn: () => fetchFeedId(id!)
  });

  const { data: commentData } = useQuery<CommentIdProps[]>({
    queryKey: ['comments'],
    queryFn: () => fetchCommentId(id!)
  });

  // feed 삭제 mutation
  const deleteFeedMutation = useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      navigate('/');
    }
  })

  // 삭제 버튼 클릭 시 실행될 함수
  const handleDeleteFeed = () => {
    if (window.confirm(`'${data?.title}' 게시글을 삭제하시겠습니까 ?`)) {
      deleteFeedMutation.mutate(data!.id);
      window.alert('삭제했습니다 !')
    } else {
      window.alert('취소 버튼을 클릭했습니다 !');
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to={'/'} className="cursor-pointer mb-4">
          {'<'} Go Back
        </Link>
        {user?.id === data?.user_id ? (
          <div className="flex gap-3 mr-9">
            <Link
              to={`/feeds/update/${id}`}
              className="flex justify-center border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteFeed}
              className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
      <div>{data ? <Feed feed={data} /> : <p>Loading...</p>}</div>
      <div className="bg-white border border-gray rounded-md flex flex-col justify-start p-8 mb-6 w-[70rem] shadow-lg">
        <div className="mb-5">
          <p className="font-bold text-lg">
            <span className="mr-2">{commentData?.length}</span>Comments
          </p>
        </div>
        <div>{commentData && commentData.map((comment) => <Comment key={comment.id} comment={comment} />)}</div>
      </div>
      <CommentForm feedId={id} />
    </div>
  );
}
