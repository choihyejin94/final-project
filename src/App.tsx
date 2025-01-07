import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Mypage from './pages/MyPage';
import Layout from './components/Layout';
import { useEffect } from 'react';
import supabase from './utils/supabase';
import { useAuthStore } from './stores/useAuthStore';

export default function App() {
  const { setUser } = useAuthStore();

    useEffect(() => {
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/feeds/:id" element={<Detail />} />
          <Route path="/feeds/create" element={<CreatePage />} />
          <Route path="/feeds/update/:id" element={<UpdatePage />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
