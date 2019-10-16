import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Container,Cart } from './styles';
import { Link } from 'react-router-dom';
import { MdShoppingBasket} from 'react-icons/md';
export default function Header() {
  return (
    <Container>
      <Link to ="/">
        <img src={logo} alt="RocketShoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <strong>3 itens</strong>
          <MdShoppingBasket size={36} color="#FFF"/>
        </div>
      </Cart>
    </Container>
  );
}

