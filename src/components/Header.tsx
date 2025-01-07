import { NavLink } from 'react-router-dom';
import zinstagram from '../../public/image/zinstagram.png';
import supabase from '../utils/supabase';
import { useAuthStore } from '../stores/useAuthStore';

export default function Header() {
  const { user, setUser } = useAuthStore();

  // supabase 로그아웃
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);

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
      {user ? (
        <div className="flex items-center gap-2 mx-1.5">
          <NavLink to={'/mypage'} className="font-bold cursor-pointer hover:underline">
            {user.user_metadata.nickName}
          </NavLink>
          <button
            onClick={signOutUser}
            className="border border-1 border-black rounded p-3 m-2 font-bold hover:bg-black hover:text-white cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      ) : (
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
