import { Product } from './product';
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: {[key:string]: ShoppingCartItem}){
        this.itemsMap = itemsMap || {};
        for (let productId in itemsMap){
            let item = this.itemsMap[productId];
            let tempShoppingCart = new ShoppingCartItem(
                {
                    ...item,
                    $key: productId
                }
            );
            this.items.push(tempShoppingCart);
        }
    }
    get totalItemsCount (){
        let shoppingCartItemCount =0;
        for(let productId in this.itemsMap){
            shoppingCartItemCount += this.itemsMap[productId].quantity;
        }
        return shoppingCartItemCount;
    }

    get totalPrice(){
        let totalPrice = 0;
        for(let productId in this.itemsMap){
            totalPrice += (this.itemsMap[productId].quantity * this.itemsMap[productId].price)
        }
        return totalPrice;
    }

    getQuantity(product:Product){
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }
}