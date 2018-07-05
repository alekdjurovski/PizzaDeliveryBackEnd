import { Component, OnInit } from '@angular/core';

import { ManageOrdersService } from './managment-orders.service';
import { Order } from '../shared/order.model';

@Component({
  selector: 'app-managment-orders',
  templateUrl: './managment-orders.component.html',
  styleUrls: ['./managment-orders.component.css']
})
export class ManagmentOrdersComponent implements OnInit {
  public orders = [];

  constructor(private manageOrders: ManageOrdersService) { }

  ngOnInit() {
    this.manageOrders.getOrders()
        .subscribe((orders:any) => {
            orders.forEach(order => {
                this.orders.push(order);
            });
        });
  }

}
