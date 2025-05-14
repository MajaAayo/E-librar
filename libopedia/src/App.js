import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Front from './pages/front';
import Explore from './pages/explore';
import Bookmarks from './pages/bookmarks';
import About from './pages/about';
import Terms from './pages/terms';
import './App.css';
import PrivacyPolicy from './pages/privacy';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Front />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;