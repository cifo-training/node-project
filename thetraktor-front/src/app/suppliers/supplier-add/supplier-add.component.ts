import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/shared/classes/supplier.model';
import { ApiSuppliersService } from 'src/app/shared/services/api-suppliers.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent implements OnInit {
  public supplier: Supplier = this.api.initSupplier();
  public supplierData: Supplier = this.api.initSupplier();
  constructor(private api: ApiSuppliersService, private router: Router) {}
  public suppliers: any = {};
  public addSupplier(arg) {
    this.supplier = arg;
    this.api.addSupplier$(this.supplier)
      .subscribe(
        res => {
          console.log(res);
          this.gotoSupplierDetails('/suppliers', this.supplier.id);
        },
        err => { console.log(`Error occured`); }
      );
  }
  public gotoSupplierDetails(url: string, id: string) {
    const myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }
  ngOnInit() {}
}
