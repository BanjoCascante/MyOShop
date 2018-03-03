import { Subscription } from 'rxjs/Subscription';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-view',
    templateUrl: './order-view.component.html',
    styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit, OnDestroy {

    order;
    orderId;
    subscription: Subscription;
    totalPriceOrder: number;
    constructor(private orderService: OrderService, private route: ActivatedRoute) {
        this.orderId = this.route.snapshot.paramMap.get('orderId');
    }

    ngOnInit() {
        this.subscription = this.orderService.getOrder(this.orderId).subscribe(order=> {
            this.order=order;
            this.totalPriceOrder = 0;
            this.order.items.forEach(orderItem => {
                this.totalPriceOrder+= orderItem.totalPrice;
            });


        });
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
