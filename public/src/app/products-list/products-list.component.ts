import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Tomato Sauce', 0, 10000 ),
        new Ingredient('Fresh Tomato', 0, 10000 ),
        new Ingredient('Fresh Peppers', 0, 10000 ),
        new Ingredient('Olives', 0, 10000 ),
        new Ingredient('Mushrooms', 0, 10000 ),
        new Ingredient('Feta Cheese', 0, 10000 ),
        new Ingredient('Mozzarella', 0, 10000 ),
        new Ingredient('Smoked Ham', 0, 10000 ),
        new Ingredient('Bacon', 0, 10000 ),
        new Ingredient('Oregano', 0, 10000 )

  ];

  constructor() { }

  ngOnInit() {
  }

}
