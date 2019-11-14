import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { MaterialModule } from '../shared/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { MatSnackBarContainer } from '@angular/material';
import { PanelContentComponent } from './todo/panel-content/panel-content.component';
import { TodotaskComponent } from './todo/panel-content/todotask/todotask.component';

@NgModule({
  declarations: [TodoComponent, PanelContentComponent, TodotaskComponent],
  imports: [
    CommonModule,
    TodoRoutingModule, FormsModule, MaterialModule
  ],
  exports: [TodoComponent, PanelContentComponent, TodotaskComponent]
})
export class TodoModule { }
