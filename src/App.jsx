import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Signup from './login/signup.tsx';
import TopHeader from './layout/TopHeader.tsx';
import Footer from './layout/Footer.tsx';
import Login from './login/login.tsx';
import Top from './top/Top.tsx';
import Mypage from './mypage/Mypage.tsx';
import ProfileEditPage from './prof_edit/ProfEditPage.tsx';
import PostAll from './post_all/Postall';
import PostDetail from './post_detail/post_detail';
import UserProf from './user_prof/user_prof';
import Pot from './Pots/Pots';
import ChatAll from './chat/chat_all';
import Notification from './notification/notification';
import HashTagPost from './hash_tag/hash_tag.tsx';
import PasswordReset from './password_reset/password_reset.tsx';
import './App.css';

const App = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
    <TopHeader></TopHeader>
    <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path='/top' element={<Top></Top>} />
          <Route path='/mypage' element={<Mypage></Mypage>} />
          <Route path='/prof_edit' element={<ProfileEditPage></ProfileEditPage>} />
          <Route path='/post_all' element={<PostAll></PostAll>} />
          <Route path='/post_detail/:id' element={<PostDetail></PostDetail>}></Route>
          <Route path='/user_prof/:id' element={<UserProf></UserProf>}></Route>
          <Route path='/pots' element={<Pot></Pot>}></Route>
          <Route path='/chat' element={<ChatAll></ChatAll>}></Route>
          <Route path='/hashtags/:hashtag' element={<HashTagPost></HashTagPost>}></Route>
          <Route path='/notification' element={<Notification></Notification>}></Route>
          <Route path='/password_reset' element={<PasswordReset />}></Route>
        </Routes>
    </Router>
    <Footer></Footer>
    <a
        href="#top"
        className={`to-top ${showTopBtn ? 'show' : ''}`}
        onClick={(e) =>{
          e.preventDefault();
          scrollToTop();
        }}
      >
        Top
      </a>
    </>
  );
};

export default App;
