export function addToCartRequest(id) {
  return {
    type: 'ADD_REQUEST',
    id,
  }
}
export function addToCartSuccess(product) {
  return {
    type: 'ADD_SUCCESS',
    product,
  }
}


export function removeFromCart(id) {
  return {
    type: 'REMOVE_FROM_CART',
    id,
  }
}

export function updateAmount(id, amount) {
  return {
    type: 'UPDATE_AMOUNT',
    id,
    amount,
  }
}