import { effect, Injectable, signal } from '@angular/core';
import { Stock } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor() { }

  // stocklist = signal<Stock[]>([
  //   { id: 1, name: 'Laptop', cuantity: 5 },
  //   { id: 2, name: 'Escritorio', cuantity: 10 },
  //   { id: 3, name: 'Silla', cuantity: 30 },
  //   { id: 4, name: 'Tinta', cuantity: 2 },
  //   { id: 5, name: 'Boligrafos', cuantity: 200 }
  // ])

  stocklist = signal<Stock[]>(loadFromlocalStorage());

  saveStocksInLocalStorage = effect(() => {
    localStorage.setItem('stock', JSON.stringify(this.stocklist()));
  });

  addStock(stockItem: Stock){
    this.stocklist.update((list) => [...list, stockItem]);
  };
}

function loadFromlocalStorage() : Stock[]{
  const stock = localStorage.getItem('stock');
  return stock ? JSON.parse(stock) : [];
}
