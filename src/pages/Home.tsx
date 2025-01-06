import { useState } from 'react';
import beforeLike from '../../public/image/before_like.png';
import afterLike from '../../public/image/after_like.png';
import comment from '../../public/image/comment.png';

export default function Home() {
  const [isLike, setIsLike] = useState(false);

  return (
    <div>
      <div>
        <div className="flex justify-end mb-2">
          <button className="border bg-black text-white rounded p-2 m-2 text-lg hover:bg-white hover:text-black hover:border-black cursor-pointer">
            글쓰기
          </button>
        </div>
        <div className="flex flex-col w-[70rem] mb-3">
          <div className="bg-white border-2 border-black rounded-md flex flex-col justify-start p-8 w-[70rem] h-[10rem] shadow-lg">
            <h3 className="font-bold text-2xl mb-2">첫 번째 게시물 등록 (수정하기)</h3>
            <p>임의로 적는 작성글이지롱 ! UI 어떻게 할 지 구상중... 이쁘게 하고 싶지만 떠오르지 않는다 .. </p>
            <p className="mt-5 text-sm text-gray-500 text-end">
              작성일 : <span>2025.01.01</span>
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
        {/* map으로 돌릴 부분! */}
        <div className="flex flex-col w-[70rem] mb-3">
          <div className="bg-white border-2 border-black rounded-md flex flex-col justify-start p-7 w-[70rem] h-[10rem] shadow-lg">
            <h3 className="font-bold text-2xl mb-2">첫 번째 게시물 등록 (수정하기)</h3>
            <p>임의로 적는 작성글이지롱 ! UI 어떻게 할 지 구상중... 이쁘게 하고 싶지만 떠오르지 않는다 .. </p>
            <p className="mt-5 text-sm text-gray-500 text-end">
              작성일 : <span>2025.01.01</span>
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
        <div className="flex flex-col w-[70rem] mb-3">
          <div className="bg-white border-2 border-black rounded-md flex flex-col justify-start p-7 w-[70rem] h-[10rem] shadow-lg">
            <h3 className="font-bold text-2xl mb-2">첫 번째 게시물 등록 (수정하기)</h3>
            <p>임의로 적는 작성글이지롱 ! UI 어떻게 할 지 구상중... 이쁘게 하고 싶지만 떠오르지 않는다 .. </p>
            <p className="mt-5 text-sm text-gray-500 text-end">
              작성일 : <span>2025.01.01</span>
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
    </div>
  );
}
