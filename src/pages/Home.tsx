import { useQuery } from '@tanstack/react-query';
import Feed from '../components/Feed';
import { fetchPosts } from '../api/feedApi';
import { Database } from '../types/supabase';

type FeedType = Database['public']['Tables']['feeds']['Row'];

export default function Home() {
  const { data: feeds } = useQuery<FeedType[]>({
    queryKey: ['feeds'],
    queryFn: fetchPosts
  });

  return (
    <div>
      <div>
        <div className="flex justify-end mb-2">
          <button className="border bg-black text-white rounded p-2 mr-5 text-lg hover:bg-white hover:text-black hover:border-black cursor-pointer">
            Writing
          </button>
        </div>
        {feeds && feeds.map((feed) => <Feed key={feed.id} feed={feed} />)}
      </div>
    </div>
  );
}
