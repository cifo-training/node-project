import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCustomersService } from 'src/app/shared/services/api-customers.service';
import { Customer } from 'src/app/shared/classes/customer.model';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ApiPlansService } from 'src/app/shared/services/api-plans.service';
import { ApiPacksService } from 'src/app/shared/services/api-packs.service';
import { Plan } from 'src/app/shared/classes/plan.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  identifier: any;
  public customer: Customer = this.api.initCustomer();
  public customerData: Customer = this.api.initCustomer();
  plans: any = [];
  packs: any = [];
  packsEdited: any = [];

  gendre: string[] = ['Male', 'Female'];

  constructor(
    public api: ApiCustomersService,
    public apiPlans: ApiPlansService,
    public apiPacks: ApiPacksService,
    public route: ActivatedRoute,
    private router: Router,
    public currentLocation: Location
  ) { }

  getCustomer() {
    this.identifier = this.route.snapshot.params.id;
    if (this.identifier !== '0') {
      this.api.getCustomer$(this.identifier).subscribe(us => {
        this.customer = us;
        this.customerData = us;
        this.setPlan();
        this.setPacks();
      });
    }
  }
  postCustomer(data) {
    if (this.identifier === '0') {
      this.addCustomer(data);
    } else { this.editCustomer(data); }
  }
  editCustomer(data) {
    this.customer = data;
    this.api.editCustomer$(this.customer).subscribe(
      res => {
        Swal.fire('Good job!', 'You edited the customer data!', 'success');
        this.gotoCustomerDetails('customers/customer_detail', this.customer._id);
      },
      err => {
        console.log('Error occurred');
      }
    );
  }
  deleteCustomer(data) {
    this.api.deleteCustomer$(data).subscribe(
      res => {
        // Swal.fire('Good job!', 'You deleted the customer!', 'success');
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this imaginary customer!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.api.deleteCustomer$(data).subscribe(
              result => {
                Swal.fire('Good job!', 'You deleted the customer!', 'success');
                this.router.navigate(['customers']);
              },
              err => {
                console.log('Error occurred');
              }
            );

            Swal.fire(
              'Deleted!',
              'Your imaginary customer has been deleted.',
              'success'
            );
            this.router.navigate(['customers']);
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

      },
      err => {
        console.log('Error occurred');
      }
    );
  }
  addCustomer(data) {
    this.customer = data;
    this.customer.packs = this.packsEdited;
    this.api.addCustomer$(this.customer).subscribe(
      res => {
        Swal.fire('Good job!', 'You added a new customer!', 'success');
        this.gotoCustomerDetails('customers/customer_detail', this.customer._id);
      },
      err => {
        console.log('Error occurred');
      }
    );
  }
  public gotoCustomerDetails(url: string, id: string) {
    const myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

  getPlans() {
    this.apiPlans.getPlans$().subscribe({
      next: arg => {
        this.plans = arg;
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.getPacks();

      }
    });
  }
  getPacks() {
    this.apiPacks.getPacks$().subscribe({
      next: arg => {
        this.packs = arg;
        const planBtn = document.getElementById(`choiceVIP`);
        planBtn['checked'] = true;
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.getCustomer();
      }
    });
  }
  setPlan() {
    const planBtn = document.getElementById(`choice${this.customerData.plan.name}`);
    if (planBtn) {
      planBtn['checked'] = true;
    }
  }
  setPacks() {
    this.packsEdited = [];
    this.customerData.packs.forEach(e => {
      const packBtn = document.getElementById(`packChoice${e['name']}`);
      if (packBtn) {
        packBtn['checked'] = true;
        this.packsEdited.push(e._id);
      }
    });
  }

  clickPlan(e, plan: Plan) {
    if (e.target.checked) {
      this.customerData.plan = plan;
    }
    console.log(this.customer.plan);

  }
  clickPack(e, id: string) {
    if (e.target.checked) { this.packsEdited.push(id); } else {
      const pos = this.packsEdited.indexOf(id);
      this.packsEdited.splice(pos, 1);
    }
    this.customerData.packs = this.packsEdited;
    console.log(this.packsEdited);
  }
  goBack() {
    this.currentLocation.back();
  }
  ngOnInit() {
    this.getPlans();

  }
}
