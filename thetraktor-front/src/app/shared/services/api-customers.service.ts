import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Customer } from '../classes/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {

  private apiURL = `${environment.API_URL}customers`;
  constructor(private http: HttpClient) { }

  initCustomer() {
    const customer: Customer = {
      _id: this.mongoObjectId(),
      guid: '',
      isActive: true,
      weight: '',
      height: '',
      birth: new Date(),
      name: {
        first: '',
        last: ''
      },
      gender: '',
      picture: 'https://katakrak.net/sites/default/files/default_images/default_profile_0.jpg',
      email: '',
      phone: '',
      address: '',
      registered: new Date(),
      plan: {
        _id: '5dc6bcb51c9d440000d8a0ab',
        options: [{_id: '',option: ''}],
        name: 'VIP',
        icon: 'vip.png',
        expanded: false
      },
      packs: [
        {
          _id: this.mongoObjectId(),
          pack: '',
          image: '',
          price: 0,
          locked: false
        }
      ],
      packList: ''

    };
    return customer;
  }
  /*   private uniqueID() {
      const thisMS: number = Date.now();
      const shake = Math.random();
      let unique: string = Math.pow(thisMS, shake).toString();
      unique = unique.toString().replace('.', thisMS.toString());
      return unique;
    } */
  public mongoObjectId() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }
  getCustomers$() {
    const customers = this.http.get<Customer>(this.apiURL);
    return customers;
  }
  getCustomersInactive$() {
    const customers = this.http.get<Customer>(`${this.apiURL}/inactive`);
    return customers;
  }
  getCustomer$(id: string) {
    const customer = this.http.get<Customer>(`${this.apiURL}/${id}`);
    return customer;
  }
  getCustomersPlan$(id: string) {
    const customers = this.http.get<Customer>(`${this.apiURL}/plan/${id}`);
    return customers;
  }
  addCustomer$(customer: Customer) {
    return this.http.post<Customer>(this.apiURL, customer)
      .pipe(tap((customer: Customer) => console.log(`added Customer: id=${customer}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
  deleteCustomer$(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  editCustomer$(customer: Customer) {
    return this.http.put<Customer>(`${this.apiURL}/${customer._id}`, customer)
      .pipe(tap((customer: Customer) => console.log(`edited Customers: id=${customer._id}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
}
