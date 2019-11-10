import { Component, OnInit } from '@angular/core';
import { ApiCustomersService } from 'src/app/shared/services/api-customers.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/classes/customer.model';
import { ApiPacksService } from 'src/app/shared/services/api-packs.service';
import { Pack } from 'src/app/shared/classes/pack.model';
import { ApiPlansService } from 'src/app/shared/services/api-plans.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  identifier: any;
  public customer: Customer = this.api.initCustomer();
  public packs: [Pack] = [this.apiPacks.initPack()];
  constructor(
    public api: ApiCustomersService,
    public apiPlan: ApiPlansService,
    public apiPacks: ApiPacksService,
    public route: ActivatedRoute) { }

  getCustomer() {
    this.identifier = this.route.snapshot.params.id;
    this.api.getCustomer$(this.identifier).subscribe(us => {
      this.customer = us;
      console.log(`this.customer`, this.customer);
    });
  }
  ngOnInit() {
    this.getCustomer();
  }

}
