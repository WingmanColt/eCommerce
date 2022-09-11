import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreSharedService } from '../../../../core-shared/src/lib/core-shared.service';

@Injectable()

export class AuthGuard implements CanActivate {
    public isUserAuthenticated: boolean;
    constructor(protected router: Router, protected accountService: CoreSharedService) {
    }


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.accountService.authChanged.subscribe(res => {
            console.log(res);
            this.isUserAuthenticated = res;
        })

        if (this.accountService.getUser() == null) {
            console.log(this.isUserAuthenticated);
            this.router.navigate(['/pages/login']);
            return false;
        }
        return true;
    }
}