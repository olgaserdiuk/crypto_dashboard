import { createReducer, on } from '@ngrx/store';
import { loadCryptos, loadCryptosSuccess, loadCryptosFailure } from '../actions/crypto.actions';
import { CryptoData } from '../models/CryptoData';


export interface CryptoState {
  cryptos: CryptoData[];
  loading: boolean;
  error: string | null;
}

export const initialState: CryptoState = {
  cryptos: [],
  loading: false,
  error: null,
};

export const cryptoReducer = createReducer(
  initialState,
  on(loadCryptos, (state) => ({ ...state, loading: true })),
  on(loadCryptosSuccess, (state, { cryptos }) => ({
    ...state,
    loading: false,
    cryptos,
  })),
  on(loadCryptosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
