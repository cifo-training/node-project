import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Supplier } from 'src/app/shared/classes/supplier.model';
import { ApiSuppliersService } from 'src/app/shared/services/api-suppliers.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public suppliers: any = [];
  public data: any;
   dataSource = new MatTableDataSource(this.suppliers);

  displayedColumns: string[] = ['id', 'name.first', 'name.last', 'email', 'age'];

  constructor(public api: ApiSuppliersService) { }

  getSuppliers() {
    this.api.getSuppliers$().subscribe(arg => {
      this.suppliers = arg;
      this.matTable();
    });
  }
  deleteSupplier(id: string) {
    this.api.deleteSupplier$(+id).subscribe(res => {
      this.data = res;
      this.getSuppliers();
    });
  }
  matTable() {
    this.dataSource = new MatTableDataSource(this.suppliers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: Supplier, property) => {
      switch (property) {
        case 'name.first': return item.name.first;
        case 'name.last': return item.name.last;
        default: return item[property];
      }
    };
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.getSuppliers();
  }

}
