import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Signup from './components/signup';
import TopHeader from './layout/TopHeader';
import Footer from './layout/Footer';
import Login from './components/login';

const App = () => {
  return (
    <>
    <TopHeader></TopHeader>
    <Router>
        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup></Signup>} />signup
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
    <Footer></Footer>
    </>
  );
};

export default App;
