import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import {ICart} from "./cart.model";
import {Pizza} from "../shared/pizza.model";



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingCart: ICart;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    if (window.localStorage && window.localStorage.shoppingCart) {
      this.shoppingCart = JSON.parse(window.localStorage.shoppingCart);
    } else {
      this.shoppingCart = {
        items: [],
        total: 0
      };
    }
  }

  removeItemFromCart(removeIndex: number){

    this.shoppingCart.items = this.shoppingCart.items
      .filter((pizza, index) => { return index !== removeIndex;});
    console.log(removeIndex, this.shoppingCart.items);
    window.localStorage.items = [...this.shoppingCart.items];
  }

  emptyCart() {
    this.shoppingCart = {
      items: [],
      total: 0
    };
    delete window.localStorage.shoppingCart;
  }
  checkout() {
    this.cartService.checkout(this.shoppingCart)
      .subscribe(
        (res) => {
          console.log(res);
          this.emptyCart();
        },
        (err) => {
          console.log(err);
        }
      );
  }

}
