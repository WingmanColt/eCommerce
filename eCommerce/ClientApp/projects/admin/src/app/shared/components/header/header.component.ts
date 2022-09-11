import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';
import { NavService } from '../../service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile: boolean;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService, private accountService: CoreSharedService, private router: Router) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }
  public logout = () => {
    this.accountService.logout();
    this.router.navigate(["/dashboard/default"]);
    console.log("navigated");
  }

  ngOnInit() { }

}
