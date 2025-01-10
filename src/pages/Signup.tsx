import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickName, setNickName] = useState('');

  const signUpNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nickName) {
      alert('닉네임을 입력해주세요 !');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('이메일 형식이 올바르지 않습니다 !');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다 !');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다 !');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickName
        }
      }
    });
    if (error) {
      console.error('supabase auth error', error);
      return;
    }

    const { error: loginError } = await supabase
      .from('users')
      .insert([{ id: data.user!.id, email, nickname: nickName }])
      .select();
    if (loginError) {
      console.error('supabase insert error', loginError);
    }

    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setNickName('');

    alert('회원가입이 완료되었습니다 !');

    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signUpNewUser}
        className="bg-white border-2 border-black rounded-md flex flex-col justify-center items-center w-[30rem] h-[35rem] shadow-xl"
      >
        <h2 className="font-bold text-5xl">회원가입</h2>
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
          <div>
            <p>Password Confirm : </p>
            <input
              type={'password'}
              placeholder={'Password'}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="border border-black rounded-md p-2 mb-3 text-lg w-[14rem] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <p>NickName : </p>
            <input
              type={'nickname'}
              placeholder={'NickName'}
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="border border-black rounded-md p-2 mb-3 text-lg w-[14rem] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
        </div>
        <button className="border bg-black text-white rounded p-3 m-2 font-bold text-2xl hover:bg-white hover:text-black hover:border-black cursor-pointer">
          Sign Up
        </button>
        <div>
          <p className="mt-2">
            Already have an account?{' '}
            <Link to="/login">
              <button className="text-red-500">Login</button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
