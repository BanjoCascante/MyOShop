import { AuthService } from '../../../shared/services/auth.service';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    @Input('isInNavBar') isInNavBar:boolean = false;
    
    constructor(private authService:AuthService) { }


    login() {
        this.authService.login();
    }
}
