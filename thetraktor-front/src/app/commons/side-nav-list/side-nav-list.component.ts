import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import navItems, { NavItem } from 'src/app/shared/classes/nav-items';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
  @ViewChild('NavBarComponent', {static: true}) public navbar: NavBarComponent;
  @Output() sidenavClose = new EventEmitter();
  public isLogged = false;
  public navList: NavItem[];


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.onCheckUser();
    this.navList = navItems;
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  public onLogout(): void {
    this.authService.logoutUser();
    this.isLogged = false;
    this.navbar.isLogged = false;
    this.router.navigate(['/home']);
  }
  public onCheckUser(): void {
    this.authService.isLogged.subscribe(value => this.isLogged = value);
  }
}
