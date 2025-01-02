import { NavLink } from 'react-router-dom';
import zinstagram from '../../public/zinstagram.png';
import { useState } from 'react';
import supabase from '../utils/supabase';

export default function Header() {
  const [isUser, setIsUser] = useState(true);

  // supabase 로그아웃 (수정필요)
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    setIsUser(false);

    if (error) {
      console.error('로그아웃 오류:', error.message);
      return;
    }
  };

  return (
    <div className="bg-white border-b-2 border-dotted border-black flex justify-between mx-1.5">
      <div className="flex items-center">
        <NavLink to={'/'}>
          <img src={zinstagram} alt="zinstagram_logo" width={150} />
        </NavLink>
      </div>
      {isUser ? (
        // true 일 때
        <div className="flex items-center gap-2 mx-1.5">
          <NavLink to={'/mypage'} className="font-bold cursor-pointer hover:underline">
            NickName(수정예정)
          </NavLink>
          <button
            onClick={signOutUser}
            className="border border-1 border-black rounded p-3 m-2 font-bold hover:bg-black hover:text-white cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        // false 일 때
        <div className="flex items-center gap-2">
          <NavLink
            to={'/Login'}
            className="border border-1 border-black rounded p-3 font-bold hover:bg-black hover:text-white cursor-pointer"
          >
            LOGIN
          </NavLink>
          <NavLink
            to={'/signup'}
            className="border border-1 border-black rounded p-3 m-2 font-bold hover:bg-black hover:text-white cursor-pointer"
          >
            SIGN UP
          </NavLink>
        </div>
      )}
    </div>
  );
}
