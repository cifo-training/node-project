import { Component, OnInit, Input, HostBinding} from '@angular/core';
import navItems, { NavItem } from 'src/app/shared/classes/nav-items';
import { Router } from '@angular/router';
import { NavService } from 'src/app/shared/services/nav.service';
import { trigger, animate, state, style, transition } from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  // @ViewChild('BreadCrumbComponent', {static: false}) public breadCrumbComponent: BreadCrumbComponent;
  @Input() item: NavItem;
  @Input() depth: number;
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  // public breadCrumb: NavItem[] = [];
  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }
  onItemSelected(e, item: NavItem, depth: number) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
          }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
        }
    });
//    this.breadCrumbComponent.breadCrumb = [];

  }

}
