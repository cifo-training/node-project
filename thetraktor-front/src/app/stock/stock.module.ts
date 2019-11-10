import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { ProductsPipePipe } from '../shared/pipes/products-pipe.pipe';
import { StockOrderComponent } from './stock-order/stock-order.component';

@NgModule({
  declarations: [StockOrderComponent, StockListComponent, ProductsPipePipe],
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule,
    MaterialModule
  ],
  exports: [StockOrderComponent, StockListComponent]
})
export class StockModule { }
