import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CryptoService } from '../../services/crypto.service';
import { loadCryptos, loadCryptosSuccess, loadCryptosFailure } from '../actions/crypto.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CryptoEffects {
constructor(private actions$: Actions, private cryptoService: CryptoService) {
  console.log('Actions:', this.actions$);
  console.log('CryptoService:', this.cryptoService);
}


  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCryptos),
      mergeMap(() =>
        this.cryptoService.getCryptos().pipe(
          map((cryptos) => {
            console.log('Cryptos loaded successfully:', cryptos);
            return loadCryptosSuccess({ cryptos });
          }),
          catchError((error) => {
            console.error('Error loading cryptos:', error);
            return of(loadCryptosFailure({ error: error.message }));
          })
        )
      )
    )
  );


}

