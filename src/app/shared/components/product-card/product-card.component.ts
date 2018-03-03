import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
    @Input('product') product;
    @Input('show-actions') showActions: boolean = true;
    @Input('shopping-cart') shoppingCart: ShoppingCart;
    constructor(private shoppingCartService: ShoppingCartService) { }

    addToCart(){
        this.shoppingCartService.addToCart(this.product);
    }


}
