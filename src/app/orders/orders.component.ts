import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy{
  subscription: any;
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  orders: any[] = [];
  productsImage: string = '';

  constructor(private _AuthService: AuthService, private _OrdersService: OrdersService, private _ProductsService: ProductsService) { }

  getOrders() {
    this.subscription = this._OrdersService.getAllOrders(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.orders = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  changeData(page: number) {
    this.page = page;
    this.getOrders();
  }

  searchData(searchData: string) {
    this.search = searchData;
    this.getOrders();
  }

  updateDelivered(orderId: string) {
    this._OrdersService.updateDeliveredOrder(orderId).subscribe({
      next: (res) => {
        this.getOrders();
        alert('Order is delivered')
      }, error: (err) => { }
    })
  }

  updatePaid(orderId: string) {
    this._OrdersService.updatePaidOrder(orderId).subscribe({
      next: (res) => {
        this.getOrders();
        alert('Order is Paid')
      }, error: (err) => { }
    })
  }


  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productsImage = this._ProductsService.productsImages;
    this.getOrders();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
