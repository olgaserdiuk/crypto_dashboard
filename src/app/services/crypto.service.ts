import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private apiKey = 'CG-ijnhv6RhmXYtcMPLHijpPMiG';

  constructor(private http: HttpClient) {}

  /**
   * Fetch cryptocurrency market data.
   * @param page - The page number to fetch (default: 1).
   * @param perPage - The number of results per page (default: 250).
   * @returns An Observable of the cryptocurrency market data.
   */
  getCryptos(page: number = 1, perPage: number = 250): Observable<any[]> {

    const params = new HttpParams()
      .set('vs_currency', 'usd') // Get market data in USD
      .set('order', 'market_cap_desc') // Order by market cap descending
      .set('per_page', perPage.toString()) // Number of results per page
      .set('page', page.toString()) // Page number
      .set('sparkline', 'false'); // Exclude sparkline data

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
