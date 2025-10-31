import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Stock } from '../../interfaces/stock.interface';

@Component({
  selector: 'stock-add',
  imports: [],
  templateUrl: './stockAdd.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockAdd {
  stockAddTitle = signal<string>("Agregar stock");

  public name = signal("Gafete");
  public cuantity = signal(10);

  OnNewStock = output<Stock>();

  addStock(){
    const newStock: Stock = {
      id: Math.floor(Math.random() * 100),
      name: this.name(),
      cuantity: this.cuantity()
    }

    this.OnNewStock.emit(newStock);
    this.resetInputs();
  }

  resetInputs(){
    this.name.set('');
    this.cuantity.set(0);
  }
}
