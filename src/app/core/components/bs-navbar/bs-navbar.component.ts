import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AuthService } from '../../../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../../../shared/models/app-user';
import { Router } from '@angular/router';
@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
    appUser: AppUser;
    cart$: Observable<ShoppingCart>
    constructor(private authService: AuthService, private shoppingCartService:ShoppingCartService, private router: Router) {
    }


    logOut() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    async ngOnInit(){
        this.authService.appUser$.subscribe(appUser=> this.appUser = appUser);
        this.cart$ = await this.shoppingCartService.getCart();
    }

}
