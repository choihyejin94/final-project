import { useState } from 'react';

const FeedForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div>
      <div className="bg-white border border-gray rounded-md flex flex-col justify-start p-8 mb-6 w-[70rem] shadow-lg">
        <div className="mb-5">
          <h4 className="font-bold text-xl mb-2">Title</h4>
          <input
            type={'textarea'}
            placeholder={'Title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg w-[66rem] h-12 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div>
          <h5 className="font-bold text-xl mb-2">Content</h5>
          <input
            type={'textarea'}
            placeholder={'POST CONTENT'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg w-[66rem] h-72 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
        <div className="flex justify-end">
          <button className="border text-lg w-16 h-8 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedForm;
