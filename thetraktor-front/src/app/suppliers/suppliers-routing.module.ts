import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: SuppliersListComponent },
  { path: 'supplier_detail/:id', component: SupplierDetailComponent },
  { path: 'add-supplier', component: SupplierAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
