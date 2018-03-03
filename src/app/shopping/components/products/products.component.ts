import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts: Product[];
    filterCategory;
    cart: any;
    cartSubscription : Subscription;
    constructor(
        route: ActivatedRoute,
        productService: ProductService,
        private shoppingCartService: ShoppingCartService
    ) {

        productService
            .getAll()
            .switchMap(products => {
                this.products = products;
                return route.queryParamMap;
            })
            .subscribe(params => {
                this.filterCategory = params.get('category');
                if (this.filterCategory) {
                    this.filteredProducts = this.products.filter(product => product.category === this.filterCategory);
                } else {
                    this.filteredProducts = this.products;
                }
            });

    }

    async ngOnInit() {
        this.cartSubscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);

    }

    ngOnDestroy(){
        this.cartSubscription.unsubscribe();
    }

}
