import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './pages';
import Roulette from './pages/roulette';
import Gallery from './pages/roulette/gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
