import { Subscription } from 'rxjs/Subscription';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css'],
    encapsulation: ViewEncapsulation.None,
    
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

    orders;
    subscription: Subscription;
    constructor(private orderService: OrderService) {
        this.subscription = orderService.getOrders().subscribe(orders => this.orders = this.orders = orders);
    }

    ngOnInit() {

    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
