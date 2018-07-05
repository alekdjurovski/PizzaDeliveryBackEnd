import { Component, OnInit } from '@angular/core';
import {Pizza} from '../shared/pizza.model';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pizzas: Pizza[] = [];
  sizeM = 10;
  sizeL = 20;
  sizePrice = this.sizeM;
  totalPrice = 0;
  pizzaPrice = 0;
  quantity = 1;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.onSizeChange('M');
    this.homeService.getPizzas()
      .subscribe((pizzas: Pizza[]) => {
        pizzas.forEach(pizza => {
          this.pizzas.push(new Pizza(pizza.imgUrl, pizza.name, pizza.description, pizza.amount, pizza.price, 'M'));
        });
      });
  }

  onSizeChange(size: string) {
    if (size === 'M') {
      this.sizePrice = this.sizeM;
    } else if (size === 'L') {
      this.sizePrice = this.sizeL;
    }
    this.totalPrice = this.pizzaPrice + this.sizePrice;
  }

}
