import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Order } from 'shared/models/order';
import { ShippingInfo } from 'shared/models/shipping-info';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
    selector: 'shipping-form',
    templateUrl: './shipping-form.component.html',
    styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
    @Input('cart') cart: ShoppingCart;
    shipping: ShippingInfo;
    userSubscription: Subscription;
    userId: string;

    constructor(
        private orderService:OrderService,
        private authService:AuthService,
        private router:Router,
        private shoppingCartService:ShoppingCartService, 
        
        
    ) { 
        this.shipping = new ShippingInfo();
    }

    ngOnInit() {
        this.userSubscription = this.authService.user$.subscribe(user=> this.userId = user.uid);    
        
    }
    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }
    async save(){
        let order = new Order(this.userId, this.shipping, this.cart);
        let result = await this.orderService.placeOrder(order);
        this.router.navigate(['/order-success',result.key]);
    }
}
