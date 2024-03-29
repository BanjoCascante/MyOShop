import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/product';
import { CategoryService } from 'shared/services/category.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    categories$;
    product:Product;
    id;
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.product = {} as Product;
        this.categories$ = categoryService.getAll();
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.productService.get(this.id).take(1).subscribe(p => this.product = p);
        }
    }

    ngOnInit() {
    }

    save(product) {
        if (this.id) {
            this.productService.update(this.id, product);
        } else {
            this.productService.create(product);
        }
        this.router.navigate(['/admin/products']);
    }

    delete(){
        if(this.id){
            this.productService.delete(this.id);
        }
        this.router.navigate(['/admin/products']);
    }

}
