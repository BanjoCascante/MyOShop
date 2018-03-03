import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    private create() {
        return this.db.list('/shopping-carts').push({
            dataCreated: new Date().getTime()
        })
    }

    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            let result = await this.create();
            localStorage.setItem('cartId', result.key);
            return result.key;
        } else {
            return cartId;
        }
    }

    async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId).map(x => new ShoppingCart(x.items));
    }

    private getItem(cartId: string, productId: string){
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    async addToCart(product: Product) {
        this.updateItem(product,1);

    }

    async removeFromCart(product: Product) {
        this.updateItem(product,-1);
    }

    async clearCart(){
        let cartId = await this.getOrCreateCartId();
        this.db.object('/shopping-carts/'+cartId+'/items').remove();
    }



    private async updateItem(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItem(cartId, product.$key);
        item$.take(1).subscribe(item => {
            let quantity = 0;
            if (item.quantity) {
                quantity = item.quantity;
            }
            if((quantity+change)===0){
                item$.remove();
            }else{
                item$.update({ 
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    quantity: quantity + change 
                });
            }
            
        });
    }
}
