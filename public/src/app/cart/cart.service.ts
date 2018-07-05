import { Injectable } from '@angular/core';
import {ICart} from "./cart.model";
import {Pizza} from "../shared/pizza.model";
import { HttpClient } from '@angular/common/http';

const checkoutUrl = 'http://localhost:7000/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  checkout(order) {
    return this.http.post<any>(`${checkoutUrl}/checkout`, order);
  }

  addToCart(item: Pizza) {
    let shoppingCart: ICart;
    if (window.localStorage && window.localStorage.shoppingCart) {
      shoppingCart = JSON.parse( window.localStorage.shoppingCart );
    } else {
      shoppingCart = { items: [], total: 0 };
    }
    shoppingCart.items.push(item);
    shoppingCart.total+= item.price;
    window.localStorage.shoppingCart = JSON.stringify(shoppingCart);
  }
}
