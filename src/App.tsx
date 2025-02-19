import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import NewsApi from './pages/NewsPage';
import Home from './pages/NewsPage'
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <ErrorBoundary>
      <div className="App" data-testid="app">
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<NewsPage data-testid="home" />} />
          </Routes>

        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
