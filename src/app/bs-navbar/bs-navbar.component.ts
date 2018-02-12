import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app-user';
@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
    appUser: AppUser;
    constructor(private authService: AuthService) {
        this.authService.appUser$.subscribe(appUser=> this.appUser = appUser);
    }


    logOut() {
        this.authService.logout();
    }

}
