import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Signup from './login/signup';
import TopHeader from './layout/TopHeader';
import Footer from './layout/Footer';
import Login from './login/login';
import Top from './top/Top';
import Mypage from './mypage/Mypage';
import ProfileEditPage from './prof_edit/ProfEditPage';
import PostAll from './post_all/Postall';
import PostDetail from './post_detail/post_detail';
import UserProf from './user_prof/user_prof';
import './App.css';
import Pot from './Pots/Pot';

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
          <Route path="/signup" element={<Signup></Signup>} />signup
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path='/top' element={<Top></Top>} />
          <Route path='/mypage' element={<Mypage></Mypage>} />
          <Route path='/prof_edit' element={<ProfileEditPage></ProfileEditPage>} />
          <Route path='/post_all' element={<PostAll></PostAll>} />
          <Route path='/post_detail/:id' element={<PostDetail></PostDetail>}></Route>
          <Route path='/user_prof/:id' element={<UserProf></UserProf>}></Route>
          <Route path='/pots' element={<Pot></Pot>}></Route>
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
