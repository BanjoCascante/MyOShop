import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MyOrdersComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    userId: string;
    orders;
    constructor(private orderService: OrderService, private authService: AuthService) {
        this.subscription =this.authService.user$.switchMap(user=>{
            if(user){
                this.userId = user.uid;
            }else{
                this.userId = '';
            }
            return this.orderService.getOrdersByUser(this.userId);
        }).subscribe(orders => this.orders = this.orders = orders);;
    }
    ngOnInit() {
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}
