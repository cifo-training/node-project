import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/shared/classes/todo.model';
import { ApiTodoService } from 'src/app/shared/services/api-todo.service';
import { MatSnackBar } from '@angular/material';
import Swal from 'sweetalert2';
import { TodoComponent } from '../todo.component';

@Component({
  selector: 'app-panel-content',
  templateUrl: './panel-content.component.html',
  styleUrls: ['./panel-content.component.scss']
})
export class PanelContentComponent implements OnInit {
  @Input() public todo: Todo;
  @Input() public dataList: string;
  public position: number;
  expandState: string;
  constructor(public apiTodo: ApiTodoService, private parent: TodoComponent, private _snackBar: MatSnackBar) { }
  ngOnInit() {
  }

}
