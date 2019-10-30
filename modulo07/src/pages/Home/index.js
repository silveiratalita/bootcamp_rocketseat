import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from "../../services/api";
import {formatPrice} from '../../util/format'
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions'
 class Home extends Component {
   state = {
     products: []
   };
   handleAddProduct = product => {
     const { addToCart } = this.props;
     addToCart(product);
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
 const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

  // const mapDispatchToProps2 = dispatch => ({
  //   addToCart: (product) => dispatch(CartActions.addToCart(product)),
  // })

  // const mapDispatchToProps3 = {
  //   addToCart: CartActions.addToCart,
  // }

export default connect(null, mapDispatchToProps)(Home);