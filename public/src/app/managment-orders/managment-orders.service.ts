import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Order } from '../shared/order.model';


@Injectable({
  providedIn: 'root'
})
export class ManageOrdersService {
    private getOrdersUrl = 'http://localhost:7000/order/allOrders';
    // private getUsersUrl: string="../../assets/data/users.json";
    

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.getOrdersUrl);
  }

  


}
