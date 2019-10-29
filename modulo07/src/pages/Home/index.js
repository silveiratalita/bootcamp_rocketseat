import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from "../../services/api";
import {formatPrice} from '../../util/format'
import { runInThisContext } from 'vm';
import cart from '../../strore/modules/cart/reducer';
import * as CartActions from '../../strore/modules/cart/actions'
 class Home extends Component {
   state = {
     products: []
   };
   handleAddProduct = product => {
     const { dispatch } = this.props;
     dispatch(CartActions.addToCart(product));
   };
   async componentDidMount() {
     const response = await api.get('products');
     const data = response.data.map(product => ({
       ...product,
       priceFormatted: formatPrice(product.price)
     }));
     this.setState({ products: data });
   }
   render() {
     const { products } = this.state;
     return (
       <ProductList>
         {products.map(product => (
           <li key={product.id}>
             <img src={product.image} alt={product.title} />
             <strong>{product.title}</strong>
             <span>{product.priceFormatted}</span>
             <button
               type="button"
               onClick={() => this.handleAddProduct(product)}
             >
               <div>
                 <MdAddShoppingCart size={16} color="#FFF" />
               </div>
               <span>Adicionar ao Carrinho</span>
             </button>
           </li>
         ))}
       </ProductList>
     );
   }
 }

export default connect()(Home);