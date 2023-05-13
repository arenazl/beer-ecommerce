import { Injectable } from '@angular/core';
import { stockPrice } from '../assets/files-challenge/stock-price';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  getStockPrice(code: number) {
    return stockPrice[code];
  }
}
