import Feed from '../components/Feed';
import profile_image from '../../public/image/profile_img.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Detail() {
  const [comment, setComment] = useState('');

  return (
    <div>
      <div className="mb-4">
        <Link to={'/'} className="cursor-pointer">
          {'<'} Go Back
        </Link>
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
        <div className="flex gap-8 mb-2 border-b border-b-stone-300 py-6"></div>
        <div>
          <button className="border border-black text-lg w-16 h-8 text-black rounded-md cursor-pointer">Edit</button>
          <button className="border border-black text-lg w-16 h-8 text-black rounded-md cursor-pointer">Delete</button>
        </div>
      </div>
      <div className="bg-white border border-gray rounded-md flex flex-col p-8 mb-6 w-[70rem] shadow-lg">
        <div>
          <div className="flex justify-between items-center">
            <p className="font-bold m-4 text-lg">Write a Comment</p>
            <button className="border text-lg w-16 h-8 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer">
              Write
            </button>
          </div>
          <input
            type={'textarea'}
            placeholder={'COMMENT'}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg w-[66rem] h-24 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
      </div>
    </div>
  );
}
