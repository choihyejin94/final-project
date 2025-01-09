import { useState } from 'react';

const CommentForm = () => {
  const [comment, setComment] = useState('');

  return (
    <>
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
    </>
  );
};

export default CommentForm;
