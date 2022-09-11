import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CoreSharedService } from '../../../../../../core-shared/src/lib/core-shared.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  public isUserAuthenticated: boolean;

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false

  public stick: boolean = false;

  constructor(private accountService: CoreSharedService) { }

  ngOnInit(): void {
    this.accountService.authChanged
      .subscribe(res => {
        console.log('Header:' + res);
        this.isUserAuthenticated = res;
      })
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
