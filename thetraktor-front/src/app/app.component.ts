import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import navItems, { NavItem } from './shared/classes/nav-items';
import { AuthService } from './shared/services/auth.service';
import { VERSION } from '@angular/material';
import { NavService } from './shared/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'TheTraktor';
  public isLogged = false;
  public navList: NavItem[];
  @ViewChild('sidenav', {static: false}) appDrawer: ElementRef;
  version = VERSION;

  constructor(private authService: AuthService, private navService: NavService) { }

  public onCheckUser(): void {
    this.authService.isLogged.subscribe(value => this.isLogged = value);
  }
  ngOnInit() {
    console.log('Browser: ', navigator.userAgent);
    this.navList = navItems;
    this.onCheckUser();
  }

  ngAfterViewInit() {
    this.navService.sidenav = this.appDrawer;
  }

}
