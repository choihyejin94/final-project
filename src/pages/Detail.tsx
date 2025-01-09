import Feed from '../components/Feed';
import { Link } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

export default function Detail() {
  return (
    <div>
      <div className="flex justify-between">
        <Link to={'/'} className="cursor-pointer mb-4">
          {'<'} Go Back
        </Link>
        <div className="flex gap-3 mr-9">
          {/* Link 경로 바꾸기 */}
          <Link
            to="/feeds/update/1"
            className="flex justify-center border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300"
          >
            Edit
          </Link>
          <button className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
            Delete
          </button>
        </div>
      </div>
      <div>
        <Feed />
      </div>
      <div className="bg-white border border-gray rounded-md flex flex-col justify-start p-8 mb-6 w-[70rem] shadow-lg">
        <div className="mb-5">
          <p className="font-bold text-lg">
            <span className="mr-2">2</span>Comments
          </p>
        </div>
        <Comment />
        <Comment />
      </div>
      <CommentForm />
    </div>
  );
}
