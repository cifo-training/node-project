import { Injectable } from '@angular/core';
import uuidv4 from 'uuid/v4';
import { CommonsService } from './commons.service';
import { environment } from 'src/environments/environment';
import { Todotask } from '../classes/todotask.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTodotasksService {

  constructor(private http: HttpClient, private commons: CommonsService) { }
  private apiURL = `${environment.API_URL}todotask`;
  public mongoObjectId() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }
    initTodotask() {
    const todotask: Todotask = {
      _id: this.mongoObjectId(),
      todotaskid: uuidv4(),
      task: '',
      registerdate: new Date(),
      state: '-1',
      disabled: false
    };
    return todotask;
  }
  getTodotasksAll$() {
    const todotasks = this.http.get<Todotask>(`${this.apiURL}all`);
    return todotasks;
  }
  getTodotasks$(id: string) {
    const todotasks = this.http.get<Todotask>(`${this.apiURL}/${id}`);
    return todotasks;
  }
  getTodotaskId$(id: string) {
    const todotask = this.http.get<Todotask>(`${this.apiURL}/${id}`);
    return todotask;
  }
  addTodotask$(todotask: Todotask) {
    return this.http.post<Todotask>(this.apiURL, todotask)
      .pipe(tap((todotask: Todotask) => {/** console.log(`added todo: todoId=${todotask.todotaskid}`) */}),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
  deleteTodotask$(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  editTodotask$(todotask: Todotask) {
    console.log(todotask);
    return this.http.put<Todotask>(`${this.apiURL}/${todotask._id}`, todotask)
      .pipe(tap((todotask: Todotask) => {/** console.log(`edited todo: id=${todotask.todotaskid}`) */}),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

}
