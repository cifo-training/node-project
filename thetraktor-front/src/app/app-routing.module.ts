import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './commons/home/home.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { TodoComponent } from './todo/todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(mod => mod.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(mod => mod.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('./suppliers/suppliers.module').then(mod => mod.SuppliersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then(mod => mod.StockModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'todoes', component: TodoComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
