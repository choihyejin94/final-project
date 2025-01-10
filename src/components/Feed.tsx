import beforeLike from '../../public/image/before_like.png';
import afterLike from '../../public/image/after_like.png';
import comment from '../../public/image/comment.png';
import { Database } from '../types/supabase';
import { fetchComments } from '../api/commentApi';
import { fetchUpvotes } from '../api/upvoteApi';
import { useQuery } from '@tanstack/react-query';

type FeedProps = Database['public']['Tables']['feeds']['Row'];
type CommentProps = Database['public']['Tables']['comments']['Row'];
type UpvoteProps = Database['public']['Tables']['upvotes']['Row'];

const Feed = ({ feed }: { feed: FeedProps }) => {
  // 데이터 가져오기 전 data가 undefined일 수 있으므로 빈 배열 설정[]
  const { data: comments = [] } = useQuery<CommentProps[]>({
    queryKey: ['comments', feed.id],
    queryFn: () => fetchComments(feed.id)
  });

  const { data: upvotes = [] } = useQuery<UpvoteProps[]>({
    queryKey: ['upvotes', feed.id],
    queryFn: () => fetchUpvotes(feed.id),
  });

  const isLiked = upvotes.some((upvote) => upvote.feed_id === feed.id);

  return (
    <div className="cursor-pointer">
      <div className="flex flex-col w-[70rem] mb-3">
        <div className="bg-white border-2 border-black rounded-md flex flex-col justify-start p-8 w-[70rem] h-[10rem] shadow-lg">
          <h3 className="font-bold text-2xl mb-2">{feed.title}</h3>
          <p>{feed.content}</p>
          <p className="mt-5 text-sm text-gray-500 text-end">
            작성일 : <span>{new Date(feed.created_at).toLocaleDateString()}</span>
          </p>
        </div>
        <div className="flex gap-3 my-2 justify-end">
          <div className="flex items-center gap-2">
            {isLiked ? (
              <img src={afterLike} alt="Like_image" className="w-8" />
            ) : (
              <img src={beforeLike} alt="beforeLike_image" className="w-8" />
            )}
            <p>{comments.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={comment} alt="comment_image" className="w-7" />
            <p>{upvotes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
