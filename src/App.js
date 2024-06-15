import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import TopHeader from './layout/TopHeader';

const App = () => {
  return (
    <>
    <TopHeader></TopHeader>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>} />signup
      </Routes>
    </Router>
    </>
  );
};

export default App;
