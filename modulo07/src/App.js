import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes' ;
import GlobalStyle from './styles/global';
import Header from './components/Header';
import ProductList from './pages/Home/index';
import { Provider } from 'react-redux';
import store from './strore'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <ProductList />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
  }

  export default App;
