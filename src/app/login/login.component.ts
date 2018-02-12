import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private authService:AuthService) { }


    login() {
        this.authService.login();
    }
}
