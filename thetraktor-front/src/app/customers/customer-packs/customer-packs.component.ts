import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Customer } from 'src/app/shared/classes/customer.model';
import { ApiCustomersService } from 'src/app/shared/services/api-customers.service';
import { ActivatedRoute } from '@angular/router';
import { Pack } from 'src/app/shared/classes/pack.model';

@Component({
  selector: 'app-customer-packs',
  templateUrl: './customer-packs.component.html',
  styleUrls: ['./customer-packs.component.scss']
})
export class AddOrderComponent implements OnChanges, OnInit {
  @Input() packs: [Pack];
  identifier: any;
  customer: Customer;
  //packs: any;
  panelOpenState = false;

  constructor(public api: ApiCustomersService, public route: ActivatedRoute) { }
  getPacks() {
    console.log('this.packs',this.packs);
    /* this.api.getCustomer$(this.identifier).subscribe(us => {
      this.customer = us;
      console.log(this.customer.packs[0]);
      if (this.customer.packs.length > 0) {
        this.packs = this.customer.packs;
        this.packs.forEach(e => {
          console.log('e', e);
        });
      }
    }); */
  }
  ngOnInit() {
    //this.getPacks();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getPacks();
  }
}
