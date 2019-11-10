import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../classes/stock.model';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  private apiURL = `${environment.API_URL}products`;
  constructor(private http: HttpClient) { }

  initProduct() {
    const product: Product = {
      id: this.uniqueID(),
      name: '',
      value: '',
      qty: -1
    };
    return product;
  }
  private uniqueID() {
    const thisMS: number = Date.now();
    const shake = Math.random();
    let unique: string = Math.pow(thisMS, shake).toString();
    unique = unique.toString().replace('.', thisMS.toString());
    return unique;
  }
  getProducts$() {
    const users = this.http.get<Product>(this.apiURL);
    return users;
  }
  getProduct$(id: string) {
    const user = this.http.get<Product>(`${this.apiURL}/${id}`);
    return user;
  }
  addProduct$(product: Product) {
    return this.http.post<Product>(this.apiURL, product)
      .pipe(tap(( product: Product) => console.log(`added Product: id=${product}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
  deleteProduct$(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  editProduct$(product: Product) {
    return this.http.put<Product>(`${this.apiURL}/${product.id}`, product)
      .pipe(tap((product: Product) => console.log(`edited Product: id=${product.id}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }



}
