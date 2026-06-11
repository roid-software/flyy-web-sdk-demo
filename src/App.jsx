import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-950 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2.5 no-underline">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-gray-950 font-bold text-sm">
                    F
                  </span>
                  <span className="text-[15px] font-semibold text-white tracking-tight">
                    Flyy <span className="text-gray-400 font-normal">/ dev docs</span>
                  </span>
                </Link>
                <div className="hidden sm:flex gap-1">
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white hover:bg-white/10 text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 no-underline"
                  >
                    Web SDK
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white hover:bg-white/10 text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 no-underline"
                  >
                    About
                  </Link>
                </div>
              </div>
              <a
                href="https://theflyy.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white text-[13px] font-medium no-underline"
              >
                theflyy.com ↗
              </a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
