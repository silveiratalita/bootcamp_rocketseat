import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes' ;
import GlobalStyle from './styles/global';
import Header from './components/Header';
import ProductList from './pages/Home/index';
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <ProductList />
      <Routes />
    </BrowserRouter>
  );
  }

  export default App;
