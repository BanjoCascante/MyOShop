import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService, router: Router, userService: UserService){
        let suscription = authService.user$.subscribe(user => {
            userService.save(user);
            let returnUrl = localStorage.getItem('returnUrl');
            if(returnUrl){
                localStorage.removeItem('returnUrl');
                router.navigateByUrl(returnUrl);
            }
        })
    }
}
