import profile_image from '../../public/image/profile_img.jpg';
import edit_camera from '../../public/image/edit_camera.png';
import { useAuthStore } from '../stores/useAuthStore';

export default function Mypage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <div className="w-48 h-48 overflow-hidden relative mb-4">
        <img src={profile_image} alt="profile_image" className="w-48 h-48 rounded-full object-cover" />
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white flex-shrink-0 absolute bottom-0 right-0 m-3 overflow-hidden">
          <img src={edit_camera} alt="edit_profile_image" className="w-4/6 h-4/6 object-cover" />
        </button>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-4">
          <p>EMAIL</p>
          <input
            type="email"
            value={user?.email}
            disabled
            className="border border-black rounded-md p-2 mb-3 text-lg w-[30rem] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex items-center gap-4">
          <p>NICKNAME</p>
          <input
            type="text"
            value={user?.nickname}
            placeholder="YOUR NICKNAME"
            className="border border-black rounded-md p-2 mb-3 text-lg w-[30rem] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
      <button className="border bg-black text-white rounded p-3 mb-6 font-bold text-xl hover:bg-white hover:text-black hover:border-black cursor-pointer">
        SAVE
      </button>
    </div>
  );
}
