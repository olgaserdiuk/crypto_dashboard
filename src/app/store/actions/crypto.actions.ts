import { createAction, props } from '@ngrx/store';
import { CryptoData } from '../models/CryptoData';


export const loadCryptos = createAction('[Crypto] Load Cryptos');
export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptos Success',
  props<{ cryptos: CryptoData[] }>()
);
export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptos Failure',
  props<{ error: string }>()
);
