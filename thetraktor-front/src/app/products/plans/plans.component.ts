import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiPlansService } from 'src/app/shared/services/api-plans.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { Plan } from 'src/app/shared/classes/plan.model';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlansComponent implements OnInit {
  // public alertOption: SweetAlertOptions = {};
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public plans: any = [];
  public data: any;
  dataSource = new MatTableDataSource(this.plans);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  displayedColumns: string[] = [ 'name', 'price'];

  constructor(public apiPlans: ApiPlansService) {
  }

  getPlans() {
    // Spinner on
    this.isLoading$.next(true);
    this.apiPlans.getPlans$().subscribe({
      next: arg => {
       // setTimeout(() => {
        this.plans = arg;
        this.matTable();
          // Spinner off

        this.isLoading$.next(false);
       // }, 30000);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
         console.log('Observer got a complete notification'); }
    });
  }
  deletePlan(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary plan!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.apiPlans.deletePlan$(id).subscribe(res => {
          this.data = res;
          this.getPlans();
        });

        Swal.fire(
          'Deleted!',
          'Your imaginary plan has been deleted.',
          'success'
        );
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary plan is safe :)',
          'error'
        );
      }
    });

  }
  matTable() {
    this.dataSource = new MatTableDataSource(this.plans);
  }
  ngOnInit() {
    this.getPlans();
  }

}
