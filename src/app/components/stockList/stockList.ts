import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Stock } from '../../interfaces/stock.interface';
import { StockService } from '../../services/stockService';

@Component({
  selector: 'stock-list',
  imports: [],
  templateUrl: './stockList.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockList {
  stockTitle = signal<string>('Listado del stock');
  stockList = input.required<Stock[]>();
}
