import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Signup from './login/signup';
import TopHeader from './layout/TopHeader';
import Footer from './layout/Footer';
import Login from './login/login';
import Top from './top/Top';

const App = () => {
  return (
    <>
    <TopHeader></TopHeader>
    <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>} />signup
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path='/top' element={<Top></Top>} />
        </Routes>
    </Router>
    <Footer></Footer>
    </>
  );
};

export default App;
