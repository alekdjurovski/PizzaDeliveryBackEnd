import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { IngredientsComponent } from './ingredients/ingredients.component';
import {Pizza} from "../shared/pizza.model";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-youmade',
  templateUrl: './youmade.component.html',
  styleUrls: ['./youmade.component.css']
})
export class YoumadeComponent implements OnInit {
  @Input()
  detail: Pizza;

  initialPrice = 5;
  sizeFactor = 1.25;
  ingredientsPrice = 0;

  ngOnInit() {
    this.detail = Object.assign({}, this.detail, {
      price: this.initialPrice,
      size: 'M',
      amount: 1,
      name: 'Custom Pizza'
    });
  }



  constructor( private cartService: CartService ) {}

  onChange(){
    this.detail.price = (this.initialPrice + this.ingredientsPrice) * this.detail.amount;

    if (this.detail.size === 'L') {
      this.detail.price *= this.sizeFactor;
    }
    this.detail = Object.assign({}, this.detail);
  }

  onSizeChange(size: string) {
    this.detail.size = size;
    this.onChange();
  }

  onAmountChange(value:number) {
    this.detail.amount = value;
    this.onChange();
  }

  onPriceChange(total) {
    this.ingredientsPrice = total;
    this.onChange();
  }

  addToCart() {
    this.cartService.addToCart(this.detail);
    alert("Successfully added");
  }

}
