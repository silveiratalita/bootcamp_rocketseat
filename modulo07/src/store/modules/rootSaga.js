import { all } from 'redux-saga/effects';
import cart from './cart/sagas';

export default function* rootSage() {
  return yield all([cart])
}