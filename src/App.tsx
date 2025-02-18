import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Home from './pages/Home'

function App() {
  return (
    <ErrorBoundary>
      <div className="App" data-testid="app">
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home data-testid="home" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
