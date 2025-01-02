import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickName, setNickName] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-white border-2 border-black rounded-md flex flex-col justify-center items-center w-[30rem] h-[35rem] shadow-xl">
        <h2 className="font-bold text-5xl">회원가입</h2>
        <div className="border-b-2 border-dotted border-black w-[28rem] my-6" />
        <div className="flex flex-col">
          <input
            type={'email'}
            placeholder={'Email'}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type={'password'}
            placeholder={'Password'}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type={'passwordconfirm'}
            placeholder={'Password Confirm'}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="border border-black rounded-md p-2 mb-3 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type={'nickname'}
            placeholder={'NickName'}
            onChange={(e) => setNickName(e.target.value)}
            className="border border-black rounded-md p-2 mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
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
