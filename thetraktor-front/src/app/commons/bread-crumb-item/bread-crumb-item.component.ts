import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { NavService } from 'src/app/shared/services/nav.service';
import { Router } from '@angular/router';
import { NavItem } from 'src/app/shared/classes/nav-items';

@Component({
  selector: 'app-bread-crumb-item',
  templateUrl: './bread-crumb-item.component.html',
  styleUrls: ['./bread-crumb-item.component.scss']
})
export class BreadCrumbItemComponent implements OnInit {
  @Input() item: NavItem;
  @Input() depth: number;
  expanded: boolean;
  active: boolean;
  @HostBinding('style.display') display: string;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }
  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
    //  this.expanded = !this.expanded;
    }
  }
  setItems() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        if (this.expanded) {
//          this.display = 'flex';
          //          this.color = 'red';
          //          this.display = 'none';
          // if (this.active){this.display='none';}
        } else {
//          this.display = 'none';
        }
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });

  }
  ngOnInit() {
    this.setItems();
  }

}
