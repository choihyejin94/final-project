import beforeLike from '../../public/image/before_like.png';
import afterLike from '../../public/image/after_like.png';
import comment from '../../public/image/comment.png';
import { Database } from '../types/supabase';
import { fetchComments } from '../api/commentApi';
import { addUpvote, deleteUpvote, fetchUpvotes } from '../api/upvoteApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { Link } from 'react-router-dom';

type FeedProps = Database['public']['Tables']['feeds']['Row'];
type CommentProps = Database['public']['Tables']['comments']['Row'];
type UpvoteProps = Database['public']['Tables']['upvotes']['Row'];

const Feed = ({ feed }: { feed: FeedProps }) => {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const queryClient = useQueryClient();

  // 데이터 가져오기 전 data가 undefined일 수 있으므로 빈 배열 설정[]
  const { data: comments = [] } = useQuery<CommentProps[]>({
    queryKey: ['comments', feed.id],
    queryFn: () => fetchComments(feed.id)
  });

  const { data: upvotes = [] } = useQuery<UpvoteProps[]>({
    queryKey: ['upvotes', feed.id],
    queryFn: () => fetchUpvotes(feed.id)
  });

  // 로그인한 사용자가 좋아요 눌렀는 지 확인 후 liked 상태 업데이트
  useEffect(() => {
    const isLiked = upvotes.some((upvote) => upvote.user_id === user?.id);
    setLiked(isLiked);
  }, [upvotes, user]);

  const deleteMutation = useMutation({
    mutationFn: deleteUpvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['upvotes'] });
    }
  });

  const addMutation = useMutation({
    mutationFn: addUpvote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['upvotes'] });
    }
  });

  const toggleUpvote = () => {
    // 로그인을 해야만 좋아요 가능
    if (!user) {
      alert('로그인 후 좋아요를 눌러주세요 !');
      return;
    }

    // 본인이 작성한 글은 좋아요 불가
    if (feed.user_id === user.id) {
      alert('본인이 작성한 글을 좋아요를 할 수 없습니다 !');
      return;
    }

    const user_id = user.id;
    if (liked) {
      deleteMutation.mutate({ user_id, feed_id: feed.id });
    } else {
      addMutation.mutate({ user_id, feed_id: feed.id });
    }
    setLiked(!liked);
  };

  return (
    <div className="cursor-pointer">
      <div className="flex flex-col w-[70rem] mb-3">
        <Link
          to={`/feeds/${feed.id}`}
          className="bg-white border-2 border-black rounded-md flex flex-col justify-start p-8 w-[70rem] h-[10rem] shadow-lg"
        >
          <h3 className="font-bold text-2xl mb-2">{feed.title}</h3>
          <p>{feed!.content}</p>
          <p className="mt-5 text-sm text-gray-500 text-end">
            작성일 : <span>{new Date(feed!.created_at).toLocaleDateString()}</span>
          </p>
        </Link>
        <div className="flex gap-3 my-2 justify-end">
          <button onClick={toggleUpvote} className="flex items-center gap-2">
            {liked ? (
              <img src={afterLike} alt="Like_image" className="w-8" />
            ) : (
              <img src={beforeLike} alt="beforeLike_image" className="w-8" />
            )}
            <p>{upvotes.length}</p>
          </button>
          <Link to={`feeds/${feed.id}`} className="flex items-center gap-2">
            <img src={comment} alt="comment_image" className="w-7" />
            <p>{comments.length}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feed;
