import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>} />
      </Routes>
    </Router>
  );
};

export default App;
