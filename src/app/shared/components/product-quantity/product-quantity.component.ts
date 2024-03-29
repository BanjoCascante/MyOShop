import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

    @Input('product') product;
    @Input('shopping-cart') shoppingCart;
    constructor(private shoppingCartService: ShoppingCartService) { }

    addToCart(){
        this.shoppingCartService.addToCart(this.product);
    }
    removeFromCart(){
        this.shoppingCartService.removeFromCart(this.product);
    }
    



}
