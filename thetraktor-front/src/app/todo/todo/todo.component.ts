import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/classes/todo.model';
import { Todotask } from 'src/app/shared/classes/todotask.model';
import { ApiTodoService } from 'src/app/shared/services/api-todo.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { ApiTodotasksService } from 'src/app/shared/services/api-todotasks.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public apiUrl = environment.API_URL;
  public todo: Todo = this.apiTodo.initTodo();
  public position: number;
  public todoList: any = [];
  public doneList: Todo[] = [];
  public doingList: Todo[] = [];
  public todoesRows: any = [];
  expandedElement: Todo | null;
  dragDisable = false;

  constructor(public apiTodo: ApiTodoService, public apiTodoTask: ApiTodotasksService, private _snackBar: MatSnackBar) { }

  getTodoes() {
    // Spinner on
    this.isLoading$.next(true);
    this.apiTodo.getTodoes$().subscribe({
      next: arg => {
        this.todoesRows = arg;
        this.todoesRows.map((e) => {
          e.disabled = false;
          switch (e.state.toString()) {
            case '0':
              this.todoList.push(e);
              break;
            case '1':
              this.doingList.push(e);
              break;
            case '2':
              this.doneList.push(e);
              // this.getTodotasks(e.todoid, e);
              break;
            default:
              break;
          }
          /**  if (e.state === '0') {
           *     this.todoList.push(e);
           *   } else if (e.state === '1') {
           *     this.doingList.push(e);
           *   } else if (e.state === '2') {
           *     this.doneList.push(e);
           *   }
           */
        });
        // Spinner off
        this.isLoading$.next(false);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
      }
    });
  }
  /**  getTodotasks(todoid, todo) {
      // Spinner on
      // this.isLoading$.next(true);
      this.apiTodoTask.getTodotasks$(todoid).subscribe({
        next: arg => {
          const todotaskssRows: any  = arg;
          console.log(todotaskssRows);
          todo.tasks = todotaskssRows.rows;
          console.log(todo.tasks);
          // Spinner off
          // this.isLoading$.next(false);
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => {
          // console.log('Observer got a complete notification');
        }
      });
    } */
  insertUpdate() {
    if (this.todo.task !== '') {
      if (this.todo.todoid !== '') {
        this.editTodo(this.todo);
      } else { this.addTodo(); }
    }
  }
  editTodo(item) {
    this.apiTodo.editTodo$(item).subscribe(
      res => {
        this.openSnackBar('Good job!, You edited the "todo" successfully!',
          'success');
      },
      err => {
        console.log('Error occurred in todoes');
      }
    );
  }
  deleteTodo(item, dataList) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the data of this TO-DO!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        console.log(item._id);
        this.apiTodo.deleteTodo$(item._id).subscribe(res => {
          this.openSnackBar(
            'Deleted!, Your TO-DO has been deleted.',
            'deleted'
          ); /*
          Swal.fire(
            'Deleted!',
            'Your TO-DO has been deleted.',
            'success'
          );*/
        });
        this.deleteParentTodo(item, dataList);
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          // position: 'top-end',
          type: 'error',
          title: 'Cancelled',
          text: 'Your TO-DO is safe :)',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  addTodo() {
    this.todo.state = '0';
    //this.todo.todotask = [Todotask];
    this.apiTodo.addTodo$(this.todo).subscribe(
      res => {
        this.todo = res;
        this.todoList.push(this.todo);
        /* Swal.fire(
        *    'Good job!',
        *    'You added a new todo!',
        *    'success'
        *  );
        */
        this.openSnackBar(
          'Good job!, You added a new todo!',
          'success'
        );
        this.todo = this.apiTodo.initTodo();
      },
      err => {
        console.log(`Error occured in todo DB`, err);
      }
    );
  }
  deleteParentTodo(item, dataList) {
    this.position = this.getItemIndex(item._id, dataList);
    if (this.position >= 0){
      dataList.splice(this.position, 1);
    }
  }
  getItemIndex(id, items) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i]._id == id) {
        return i;
      }
    }
    return -1;
  }
  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let state = '';
      let item;
      if (event.container.element.nativeElement.classList.contains('todoList')) {
        item = this.todoList[event.currentIndex];
        state = '0';
      } else if (event.container.element.nativeElement.classList.contains('doingList')) {
        item = this.doingList[event.currentIndex];
        state = '1';
      } else if (event.container.element.nativeElement.classList.contains('doneList')) {
        item = this.doneList[event.currentIndex];
        state = '2';
      }
      item.state = state;
      this.editTodo(item);
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  expandedFunc(e) {
    this.expandedElement = e;
  }

  ngOnInit() {
    this.getTodoes();
  }

}
