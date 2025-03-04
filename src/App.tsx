import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./login/signup.tsx";
import TopHeader from "./layout/TopHeader.tsx";
import Footer from "./layout/Footer.tsx";
import Login from "./login/login.tsx";
import Top from "./top/Top.tsx";
import Mypage from "./mypage/Mypage.tsx";
import ProfileEditPage from "./prof_edit/ProfEditPage.tsx";
import PostAll from "./post_all/Postall.tsx";
import PostDetail from "./post_detail/post_detail.tsx";
import UserProf from "./user_prof/user_prof.tsx";
import Pot from "./Pots/Pots.tsx";
import ChatAll from "./chat/chat_all.tsx";
import Notification from "./notification/notification.tsx";
import HashTagPost from "./hash_tag/hash_tag.tsx";
import PasswordReset from "./password_reset/password_reset.tsx";
import AudioDetails from "./audio_details/audio_details.tsx";
import "./App.css";

const App: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Router>
        <TopHeader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/top" element={<Top />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/prof_edit" element={<ProfileEditPage />} />
          <Route path="/post_all" element={<PostAll />} />
          <Route path="/post_detail/:id" element={<PostDetail />} />
          <Route path="/user_prof/:id" element={<UserProf />} />
          <Route path="/pots" element={<Pot />} />
          <Route path="/chat" element={<ChatAll />} />
          <Route path="/hashtags/:hashtag" element={<HashTagPost />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/password_reset" element={<PasswordReset />} />
          <Route path="/audio_details/:id" element={<AudioDetails />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
        </Routes>
        <Footer />
        <a
          href="#top"
          className={`to-top ${showTopBtn ? "show" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          Top
        </a>
      </Router>
    </>
  );
};

export default App;
