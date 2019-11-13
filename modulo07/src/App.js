import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import './config/ReactotronConfig';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import history from './services/history';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <Router history ={history}>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
  }

  export default App;
