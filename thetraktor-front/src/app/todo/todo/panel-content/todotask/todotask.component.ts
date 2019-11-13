import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Todotask } from 'src/app/shared/classes/todotask.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material';
import uuidv4 from 'uuid/v4';
import { PanelContentComponent } from '../panel-content.component';
import { ApiTodoService } from 'src/app/shared/services/api-todo.service';
import { Todo } from 'src/app/shared/classes/todo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todotask',
  templateUrl: './todotask.component.html',
  styleUrls: ['./todotask.component.scss']
})
export class TodotaskComponent implements AfterViewInit, OnInit {
  @Input() public todo: Todo;
  public position: number;
  public todotask: Todotask = this.apiTodo.initTodotask();
  public todoList: Todotask[] = [];
  public doneList: Todotask[] = [];
  public todotaskssRows: any = [];

  constructor(public apiTodo: ApiTodoService, private parent: PanelContentComponent, private _snackBar: MatSnackBar) { }
  getTodotasks(todoid) {
    // Spinner on
    // this.isLoading$.next(true);
    this.apiTodo.getTodoId$(todoid).subscribe({
      next: arg => {
        this.todotaskssRows = arg;
        //console.log(arg);
        this.todotaskssRows.todotask.map((e) => {
          e.disabled = false;
          if(e.name!=''){
          switch (e.state) {
            case '0':
              this.todoList.push(e);
              break;
            case '1':
              this.doneList.push(e);
              break;
            default:
              break;
          }}
        });
        // Spinner off
        // this.isLoading$.next(false);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        // console.log('Observer got a complete notification');
      }
    });
  }
  drop(event: CdkDragDrop<Todotask[]>) {
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
      } else if (event.container.element.nativeElement.classList.contains('doneList')) {
        item = this.doneList[event.currentIndex];
        state = '1';
      }
      item.state = state;
      this.editTodotask(item);
    }
  }
  insertUpdate() {
    this.editTodo(this.todo);
  }
  editTodotask(item) {
    console.log('item', item);
    this.todo.todotask.forEach((element, index) => {
      if (element.todotaskid === item.todotaskid) {
        this.todo.todotask[index] = item;
        this.editTodo(this.todo);
      }
    });
  }
  addTodotask() {
    //this.todotask._id = this.todo._id;
    if (this.todo.todotask) {
      this.todo.todotask.splice(0, 0, this.todotask);
    } else {
      this.todo.todotask = [this.apiTodo.initTodotask()];
      this.todo.todotask.push(this.todotask);
    }
    this.todoList = JSON.parse( JSON.stringify( this.todo.todotask ) );
    //this.todotask = this.apiTodo.initTodotask();
    this.editTodo(this.todo);
  }
  editTodo(item) {
    this.apiTodo.editTodo$(item).subscribe(
      res => {
        this.openSnackBar(
          'Good job!, You added a new task!',
          'success'
        );
      },
      err => {
        console.log('Error occurred in todoes');
      }
    );
  }

  deleteTodotask(item, dataList) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the data of this TO-DO!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.todo.todotask.forEach((element, index) => {
          if (element.todotaskid === item.todotaskid) {
            this.todo.todotask.splice(index, 1);
          }
        });
        this.editTodo(this.todo);
        this.openSnackBar(
          'Good job!, Your TO-DO task has been edited!',
          'success'
        );
        this.deleteParentTodo(item, dataList);
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your TO-DO task is safe :)',
          'error'
        );
      }
    });
  }/**/
  deleteParentTodo(item, dataList) {
    this.position = this.getItemIndex(item.todotaskid, dataList);
    dataList.splice(this.position, 1);
  }
  getItemIndex(name, items) {
    //console.log(items);
    //console.log(name);
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].todotaskid == name) {
        return i;
      }
    }
    return -1;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.getTodotasks(this.todo._id);
  }
  ngAfterViewInit() {
  }

}
