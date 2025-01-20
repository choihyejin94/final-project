import Feed from '../components/Feed';
import { Link, useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import { useQuery } from '@tanstack/react-query';
import { fetchFeedId } from '../api/feedApi';
import { Database } from '../types/supabase';
import { fetchCommentId } from '../api/commentApi';

type FeedIdProps = Database['public']['Tables']['feeds']['Row'];
type CommentIdProps = Database['public']['Tables']['comments']['Row'];

export default function Detail() {
  const { id } = useParams();

  const { data } = useQuery<FeedIdProps>({
    queryKey: ['feedId', id],
    queryFn: () => fetchFeedId(id!)
  });

  const { data: commentData } = useQuery<CommentIdProps[]>({
    queryKey: ['comments'],
    queryFn: () => fetchCommentId(id!)
  });

  return (
    <div>
      <div className="flex justify-between">
        <Link to={'/'} className="cursor-pointer mb-4">
          {'<'} Go Back
        </Link>
        <div className="flex gap-3 mr-9">
          <Link
            to={`/feeds/update/${id}`}
            className="flex justify-center border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
          >
            Edit
          </Link>
          <button className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
            Delete
          </button>
        </div>
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
      <CommentForm />
    </div>
  );
}
