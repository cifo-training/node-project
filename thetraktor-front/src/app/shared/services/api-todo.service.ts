import { Injectable } from '@angular/core';
import uuidv4 from 'uuid/v4';
import { CommonsService } from './commons.service';
import { environment } from 'src/environments/environment';
import { Todo } from '../classes/todo.model';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Todotask } from '../classes/todotask.model';

@Injectable({
  providedIn: 'root'
})
export class ApiTodoService {

  constructor(private http: HttpClient, private commons: CommonsService) { }
  private apiURL = `${environment.API_URL}todo`;
  initTodo() {
    const todo: Todo = {
      _id: this.mongoObjectId(),
      todoid: '',
      task: '',
      type: 0,
      section: 0,
      registerdate: new Date(),
      state: '0',
      description: '',
      disabled: false,
      todotask: [new Todotask]
    };
    return todo;
  }
  public mongoObjectId() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }
  initTodotask() {
    const todotask: Todotask = {
      todotaskid: uuidv4(),
      _id: this.mongoObjectId(),
      task: '',
      registerdate: new Date(),
      state: '0',
      disabled: false
    };
    return todotask;
  }

  getTodoes$() {
    const todoes = this.http.get<Todo>(`${this.apiURL}s`);
    return todoes;
  }
  getTodoId$(id: string) {
    const todo = this.http.get<Todo>(`${this.apiURL}s/${id}`);
    return todo;
  }
  addTodo$(todo: Todo) {
    return this.http.post<Todo>(`${this.apiURL}s`, todo)
      .pipe(tap((todo: Todo) => {/** console.log(`added todo: todoId=${todo.todoid}`) */ }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
  deleteTodo$(id: string) {
    return this.http.delete(`${this.apiURL}s/${id}`);
  }
  editTodo$(todo: Todo) {
    return this.http.put<Todo>(`${this.apiURL}s/${todo._id}`, todo)
      .pipe(tap((todo: Todo) => {/** console.log(`edited todo: id=${todo.todoid}`) */ }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

}
