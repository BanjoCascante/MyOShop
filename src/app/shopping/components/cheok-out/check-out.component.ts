import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
    cart$: Observable<ShoppingCart>;
    
    constructor(
        private shoppingCartService:ShoppingCartService, 
        private orderService:OrderService,
        
    ) { }

    async ngOnInit() {
        this.cart$ = await this.shoppingCartService.getCart();
    }
}
