import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../classes/plan.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPlansService {

  private apiURL = `${environment.API_URL}plans`;
  constructor(private http: HttpClient) { }

  initPlan() {
    const plan: Plan = {
      _id: '5dc0b7a4b73fc84c308441f2',
      name: '',
      icon: '',
      options: [
        {
          _id: '',
          option: ''
        }
      ],
      expanded: false
    };
    return plan;
  }
  getPlans$() {
    const users = this.http.get<Plan>(this.apiURL);
    return users;
  }
  getPlan$(id: string) {
    const plan = this.http.get<Plan>(`${this.apiURL}/${id}`);
    return plan;
  }
  addPlan$(plan: Plan) {
    return this.http.post<Plan>(this.apiURL, plan)
      .pipe(tap((plan: Plan) => console.log(`added Plan: id=${plan}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
  deletePlan$(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  editPlan$(plan: Plan) {
    return this.http.put<Plan>(`${this.apiURL}/${plan._id}`, plan)
      .pipe(tap((plan: Plan) => console.log(`edited Plans: id=${plan._id}`)),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

}
