import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCustomersService } from 'src/app/shared/services/api-customers.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Customer } from 'src/app/shared/interfaces/customer-interface';
import Swal from 'sweetalert2';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { ApiPlansService } from 'src/app/shared/services/api-plans.service';
import { Plan } from 'src/app/shared/classes/plan.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomersListComponent implements OnInit {
  // public alertOption: SweetAlertOptions = {};
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public customers: any = [];
  public data: any;

  dataSource = new MatTableDataSource(this.customers);
  activity = true;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  plans: any = [];
  selectedPlan = '';

  displayedColumns: string[] = ['picture', 'name', 'date', 'plan', 'packs', 'access'];

  constructor(public apiCustomers: ApiCustomersService, public apiPlans: ApiPlansService) {
  }

  getCustomers() {
    // Spinner on
    this.isLoading$.next(true);
    this.apiCustomers.getCustomers$().subscribe({
      next: arg => {
        // setTimeout(() => {
        this.customers = arg;
        this.matTable();
        // Spinner off

        this.isLoading$.next(false);
        // }, 30000);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        //console.log(this.customers);
        console.log('Observer got a complete notification');
      }
    });
  }
  getCustomersInactive() {
    // Spinner on
    this.isLoading$.next(true);
    this.apiCustomers.getCustomersInactive$().subscribe({
      next: arg => {
        this.customers = arg;
        this.matTable();
        // Spinner off
        this.isLoading$.next(false);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
      }
    });
  }
  getActivity() {
    const activityLabel = document.getElementById('activity');
    if (this.activity) {
      this.getCustomersInactive();
      activityLabel.innerHTML = 'Ver activos?';
    } else {
      this.getCustomers();
      activityLabel.innerHTML = 'Ver inactivos?';
    }
    this.activity = !this.activity;
  }
  filterPlan(filterValue: any) {
    console.log('filterValue: ', filterValue);
    if (filterValue) {
      // Spinner on
      this.isLoading$.next(true);
      this.apiCustomers.getCustomersPlan$(filterValue._id).subscribe({
        next: arg => {
          this.customers = arg;
          this.matTable();
          this.activity = true;
          const activityLabel = document.getElementById('activity');
          activityLabel.innerHTML = 'Ver inactivos?';
          // Spinner off
          this.isLoading$.next(false);
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => {
          console.log('Observer got a complete notification');
        }
      });
    } else {
      this.getCustomers();
    }
  }
  getCustomersPlan(filterValue) {
    // Spinner on
    this.isLoading$.next(true);
    this.apiCustomers.getCustomers$().subscribe({
      next: arg => {
        this.customers = arg;
        this.matTable();
        // Spinner off
        this.isLoading$.next(false);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
      }
    });
  }
  deleteCustomer(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary customer!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.apiCustomers.deleteCustomer$(id).subscribe(res => {
          this.data = res;
          this.getCustomers();
        });

        Swal.fire(
          'Deleted!',
          'Your imaginary customer has been deleted.',
          'success'
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary customer is safe :)',
          'error'
        );
      }
    });

  }
  getPlans() {
    // Spinner on
    this.isLoading$.next(true);
    this.apiPlans.getPlans$().subscribe({
      next: arg => {
        this.plans = arg;
        console.log(this.plans);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
      }
    });
  }

  matTable() {
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: Customer, property) => {
      switch (property) {
        case 'picture': return item.id;
        //case 'name': return item.name.first;
        case 'name': return item.name.last;
        default: return item[property];
      }
    };
    this.dataSource.filterPredicate = (data: Customer, filter) =>
      (data.name.first.trim().toLowerCase().indexOf(filter) !== -1 ||
        data.name.last.trim().toLowerCase().indexOf(filter) !== -1 );
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.getPlans();
    this.getCustomers();
  }

}
