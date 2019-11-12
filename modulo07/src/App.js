import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './config/ReactotronConfig';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import ProductList from './pages/Home/index';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
  }

  export default App;
