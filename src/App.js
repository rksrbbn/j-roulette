import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './pages';
import Roulette from './pages/roulette';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/roulette" element={<Roulette />} />
      </Routes>
    </Router>
  );
}

export default App;
