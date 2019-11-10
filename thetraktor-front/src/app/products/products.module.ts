import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PlansComponent } from './plans/plans.component';
import { PacksComponent } from './packs/packs.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material/material.module';

@NgModule({
  declarations: [PlansComponent, PacksComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule, FormsModule, MaterialModule
  ],
  exports: [PlansComponent, PacksComponent]
})
export class ProductsModule { }
