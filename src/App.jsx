import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import About from './About';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-10">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Flyy SDK Demo
                </h2>
                <div className="flex gap-8">
                  <Link 
                    to="/" 
                    className="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 relative pb-0.5"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors duration-200 relative pb-0.5"
                  >
                    About
                  </Link>
                </div>
              </div>
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
