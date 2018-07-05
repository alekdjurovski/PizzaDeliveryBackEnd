import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Ingredient } from './shared/ingredient.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private getIngredientsUrl = 'http://localhost:7000/ingredientsapi/ingredients';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.getIngredientsUrl);

  }




}
