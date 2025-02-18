import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import NewsApi from './pages/NewsApi';
import Home from './pages/NewsApi'
import NewsCred from './pages/NewsCred';
import OpenNews from './pages/OpenNews';

function App() {
  return (
    <ErrorBoundary>
      <div className="App" data-testid="app">
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<NewsApi data-testid="home" />} />
            <Route path="/OpenNews" element={<OpenNews />} />
            <Route path="/NewsCred" element={<NewsCred />} />
          </Routes>

        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
