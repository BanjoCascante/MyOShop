import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private userService: UserService) { }

    canActivate(): Observable<boolean> {
        return this.authService.appUser$.map(user =>
             user.isAdmin
        );

        

    }
}
