import Feed from '../components/Feed';
import profile_image from '../../public/image/profile_img.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Detail() {
  const [comment, setComment] = useState('');

  return (
    <div>
      <div className="flex justify-between">
        <Link to={'/'} className="cursor-pointer mb-4">
          {'<'} Go Back
        </Link>
        <div className="flex gap-3 mr-9">
          <button className="border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
            Edit
          </button>
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
        <div className="flex justify-between gap-8 mb-2 border-b border-b-stone-300 py-6">
          <div className="flex">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={profile_image} alt="profile_image" className="w-full h-full object-cover" />
            </div>
            <div className="ml-5">
              <h4 className="font-bold text-lg">헤지니(nickname으로 수정예정)</h4>
              <p className="mt-3">UI 이쁘게 좀 해봐봐! 지금은 넘 별로자나~ (댓글 수정예정)</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 mr-3">
            <button className="border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
              Edit
            </button>
            <button className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
              Delete
            </button>
          </div>
        </div>
        {/* 댓글 입력하면 나오게 하기 (수정예정) */}
        <div className="flex justify-between gap-8 mb-2 border-b border-b-stone-300 py-6">
          <div className="flex">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={profile_image} alt="profile_image" className="w-full h-full object-cover" />
            </div>
            <div className="ml-5">
              <h4 className="font-bold text-lg">헤지니(nickname으로 수정예정)</h4>
              <p className="mt-3">UI 이쁘게 좀 해봐봐! 지금은 넘 별로자나~ (댓글 수정예정)</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 mr-3">
            <button className="border border-black text-base w-12 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
              Edit
            </button>
            <button className="border border-black text-base w-14 h-6 text-black rounded-lg cursor-pointer hover:bg-black hover:text-white transition duration-300">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray rounded-md flex flex-col p-8 mb-6 w-[70rem] shadow-lg">
        <div>
          <div className="flex justify-between items-center">
            <p className="font-bold m-3 text-lg">Write a Comment</p>
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
