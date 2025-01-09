const CommentForm = () => {
  return (
    <>
      <div className="bg-white border border-gray rounded-md flex flex-col p-8 mb-6 w-[70rem] shadow-lg">
        <div>
          <div className="flex justify-between items-center">
            <p className="font-bold ml-2 my-3 text-lg">Write a Comment</p>
            <button className="border text-lg w-16 h-8 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black cursor-pointer">
              Write
            </button>
          </div>
          <textarea placeholder="YOUR COMMENT" required className="border border-gray-200 rounded-lg w-[66rem] h-[100px] p-3 resize-none" />
        </div>
      </div>
    </>
  );
};

export default CommentForm;
