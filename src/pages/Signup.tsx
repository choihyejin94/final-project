import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickName, setNickName] = useState('');

  const signUpNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailVaildCheck = () => {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(email);
    };
    if (!emailVaildCheck()) {
      alert('이메일 형식이 맞지 않습니다');
      return;
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
    } else {
      setUser(data.user);
    }

    const { data: loginData, error: loginError } = await supabase
      .from('users')
      .insert([{ id: data.user.id, email, nickname: nickName }])
      .select();
    if (loginError) {
      console.error('supabase insert error', loginError);
    } else {
      console.log('inserted data', loginData);
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
          <input
            type={'email'}
            placeholder={'Email'}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded-md p-2 mb-1 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {email ? '' : <p className="text-red-500 text-xs mb-2">이메일을 입력해주세요 !</p>}
          <input
            type={'password'}
            placeholder={'Password'}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black rounded-md p-2 mb-1 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {password.length >= 8 ? '' : <p className="text-red-500 text-xs mb-2">8자 이상 입력해주세요 !</p>}
          <input
            type={'password'}
            placeholder={'Password Confirm'}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="border border-black rounded-md p-2 mb-1 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {password === passwordConfirm ? (
            ''
          ) : (
            <p className="text-red-500 text-xs mb-2">패스워드가 일치하지 않습니다 !</p>
          )}
          <input
            type={'nickname'}
            placeholder={'NickName'}
            onChange={(e) => setNickName(e.target.value)}
            className="border border-black rounded-md p-2 mb-1 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {nickName ? '' : <p className="text-red-500 text-xs mb-2">닉네임을 입력해주세요 !</p>}
        </div>
        <button className="border bg-black text-white rounded p-3 m-2 font-bold text-2xl hover:bg-white hover:text-black hover:border-black cursor-pointer">
          Sign Up
        </button>
        <div>
          <p className="text-sm mt-2">
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
