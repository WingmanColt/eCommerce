import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {
  public isUserAuthenticated: boolean;
  @Input() class: string = 'header-2';
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false

  public stick: boolean = false;

  constructor(private accountService: CoreSharedService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.authChanged
      .subscribe(res => {
        console.log('Header:' + res);
        this.isUserAuthenticated = res;
      })
  }

  public logout = () => {
    this.accountService.logout();
    this.router.navigate(["/"]);
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

}
