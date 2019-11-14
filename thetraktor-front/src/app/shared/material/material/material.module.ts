import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatButtonModule, MatTabsModule,
  MatListModule, MatInputModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatProgressSpinnerModule, MatCheckboxModule, MatDividerModule,
  MatFormFieldModule, MatCardModule, MatProgressBarModule, MatExpansionModule,
  MatDialogModule,
  MatRippleModule,
  MatSnackBarModule,
  MatDatepickerModule, MatNativeDateModule,
  MatRadioModule, MatSlideToggleModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const MaterialComponents = [
  DragDropModule,
  FlexLayoutModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSortModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }
