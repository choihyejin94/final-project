import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요 !');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요 !');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error('supabase login error', error);
      alert('아이디와 비밀번호를 확인해주세요 !')
      return;
    }

    alert('로그인이 완료되었습니다 !');

    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginUser}
        className="bg-white border-2 border-black rounded-md flex flex-col justify-center items-center w-[30rem] h-[35rem] shadow-xl"
      >
        <h2 className="font-bold text-5xl">로그인</h2>
        <div className="border-b-2 border-dotted border-black w-[28rem] my-6" />
        <div className="flex flex-col">
          <div>
            <p>Email : </p>
            <input
              type={'email'}
              placeholder={'your@email.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-md p-2 mb-3 text-lg w-[14rem] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <p>Password : </p>
            <input
              type={'password'}
              placeholder={'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-md p-2 mb-3 text-lg w-[14rem] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>
        <button className="border bg-black text-white rounded p-3 m-2 font-bold text-2xl hover:bg-white hover:text-black hover:border-black cursor-pointer">
          Login
        </button>
        <div>
          <p className="mt-2">
            Don't have an account?{' '}
            <Link to="/signup">
              <button className="text-red-500">Sign Up</button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}