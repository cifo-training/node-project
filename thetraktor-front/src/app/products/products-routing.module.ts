import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansComponent } from './plans/plans.component';
import { PacksComponent } from './packs/packs.component';

const routes: Routes = [
  { path: 'plans', component: PlansComponent },
  { path: 'packs', component: PacksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
