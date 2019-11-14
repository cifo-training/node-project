import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/shared/classes/supplier.model';
import { ApiSuppliersService } from 'src/app/shared/services/api-suppliers.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {
  identifier: any;
  public supplier: Supplier ;
  constructor(public api: ApiSuppliersService, public route: ActivatedRoute) { }

  getUser() {
    this.identifier = this.route.snapshot.params.id;
    this.api.getSupplier$(this.identifier).subscribe(us => this.supplier = us);
  }
  ngOnInit() {
    this.getUser();
  }

}
