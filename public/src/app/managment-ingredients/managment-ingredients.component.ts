import { Component, OnInit } from '@angular/core';
import { ManageIngredientsService } from './manage-ingredients.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-managment-ingredients',
  templateUrl: './managment-ingredients.component.html',
  styleUrls: ['./managment-ingredients.component.css']
})
export class ManagmentIngredientsComponent implements OnInit {
  ingredient = {};
  public ingredients = [];

  constructor(private manageIngredients: ManageIngredientsService) { }

  ngOnInit() {
    this.manageIngredients.getIngredients()
        .subscribe((ingredients: Ingredient[]) => {
            ingredients.forEach(ingredient => {
                this.ingredients.push(new Ingredient(ingredient.name, ingredient.price, ingredient.amount));
            });
        });
  }

  addNewIngredient() {
    this.manageIngredients.addIngredient(this.ingredient)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  removeIngredient(ingredient: Ingredient) {
    this.manageIngredients.deleteIngredient(this.ingredient)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );


  }

}
