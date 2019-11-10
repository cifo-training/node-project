import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from '../shared/material/material/material.module';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';

@NgModule({
  declarations: [SupplierDetailComponent, SuppliersListComponent, SupplierAddComponent],
  imports: [
    CommonModule, SuppliersRoutingModule, FormsModule, MaterialModule
  ],
  exports: [SupplierDetailComponent, SuppliersListComponent, SupplierAddComponent]
})
export class SuppliersModule { }
