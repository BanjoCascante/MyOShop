import { Component, OnInit,OnDestroy,ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products: Product[];
    filteredProducts: any[];
    subscription : Subscription;
    tableColumns = {

    }
    
    constructor(private productService: ProductService) { 
        this.subscription = productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
    }

    filter(value:string){
        if(value){
            this.filteredProducts = this.products.filter(p=> p.title.toLowerCase().includes(value.toLowerCase()));
        }else{
            this.filteredProducts = this.products;
        }
    }
    ngOnInit() {
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
