import { useState } from 'react';
import beforeLike from '../../public/image/before_like.png';
import afterLike from '../../public/image/after_like.png';
import comment from '../../public/image/comment.png';
import { Database } from '../types/supabase';

type FeedProps = Database['public']['Tables']['feeds']['Row'];

const Feed = ({feed}: {feed:FeedProps}) => {
  const [isLike, setIsLike] = useState(false);

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
            {isLike ? (
              <img src={afterLike} alt="Like_image" className="w-8" />
            ) : (
              <img src={beforeLike} alt="beforeLike_image" className="w-8" />
            )}
            <p>1</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={comment} alt="comment_image" className="w-7" />
            <p>1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
