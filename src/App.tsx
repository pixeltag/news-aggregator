import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <ErrorBoundary>
      <div className="App" data-testid="app">
        <Header />
        <div className='container'>
          <NewsPage data-testid="home" />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
