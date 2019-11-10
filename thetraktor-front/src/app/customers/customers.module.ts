import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material/material.module';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { AddOrderComponent } from './customer-packs/customer-packs.component';

@NgModule({
  declarations: [CustomerDetailComponent, CustomersListComponent, CustomerEditComponent, AddOrderComponent],
  imports: [
    CommonModule, CustomersRoutingModule, FormsModule, MaterialModule
  ],
  exports: [CustomerDetailComponent, CustomersListComponent, CustomerEditComponent, AddOrderComponent]
})
export class CustomersModule { }
