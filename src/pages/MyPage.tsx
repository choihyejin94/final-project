import profile_image from '../../public/image/profile_img.jpg';
import edit_camera from '../../public/image/edit_camera.png';
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';

export default function Mypage() {
  const { user } = useAuthStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>('');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setImagePreview(user.img_url);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setProfileFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    if (!user?.id) {
      alert('유저 ID를 찾을 수 없습니다.');
      setIsUploading(false);
      return;
    }

    const updateData = {
      nickname: nickname,
      img_url: imagePreview
    };

    if (profileFile) {
      const fileExt = profileFile.name.split('.').pop();
      const filePath = `${user?.id}/profile_${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from('profile').upload(filePath, profileFile);
      if (error) {
        alert(`이미지 업로드에 실패했습니다. ${error.message}`);
        setIsUploading(false);
        return;
      }

      const {
        data: { publicUrl }
      } = supabase.storage.from('profile').getPublicUrl(filePath);
      updateData.img_url = publicUrl;
    }

    await supabase.auth.updateUser({
      data: updateData
    });

    const { error: updateError } = await supabase.from('users').update(updateData).eq('id', user.id);
    if (updateError) {
      alert(`DB 업데이트 실패 : ${updateError.message}`);
    } else {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <div className="w-48 h-48 overflow-hidden relative mb-4">
        {imagePreview ? (
          <img src={imagePreview} alt="profile_image" className="w-48 h-48 rounded-full object-cover" />
        ) : (
          <img src={profile_image} alt="profile_image" className="w-48 h-48 rounded-full object-cover" />
        )}

        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white flex-shrink-0 absolute bottom-0 right-0 m-3 overflow-hidden"
        >
          <img src={edit_camera} alt="edit_camera" className="w-8" />
          <input type="file" id="fileInput" onChange={handleFileChange} className="hidden" />
        </label>
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
            value={nickname ?? ''}
            onChange={handleNicknameChange}
            placeholder="YOUR NICKNAME"
            className="border border-black rounded-md p-2 mb-3 text-lg w-[30rem] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isUploading}
        className="border bg-black text-white rounded p-3 mb-6 font-bold text-xl hover:bg-white hover:text-black hover:border-black cursor-pointer"
      >
        {isUploading ? 'UPLODING...' : 'SAVE'}
      </button>
    </form>
  );
}
