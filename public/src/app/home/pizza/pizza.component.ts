import {Component, Input, OnInit} from '@angular/core';
import {Pizza} from '../../shared/pizza.model';
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  @Input()
  detail: Pizza;

  initialPrice: number;
  sizeFactor = 1.25;

  // pizza = {
  //   name: this.detail.name,
  //   quantity: this.detail.amount,
  //   price: this.detail.price
  // };


  constructor( private cartService: CartService) {
  }

  ngOnInit() {
    this.detail = Object.assign({}, this.detail);
    this.detail.amount = 1;
    this.initialPrice = this.detail.price;
  }

  onSizeChange(size: string) {
    this.detail.size = size;
    this.detail.price = this.initialPrice * this.detail.amount;

    if (size === 'L') {
      this.detail.price *= this.sizeFactor;
    }
  }

  onQuantityChange(quantity: number) {
    this.detail.amount = quantity;
    this.detail.price = this.initialPrice * quantity;

    if (this.detail.size === 'L') {
      this.detail.price *= this.sizeFactor;
    }
  }
  addToCart() {
    this.cartService.addToCart(this.detail);
    alert("Successfully added");
  }

}
