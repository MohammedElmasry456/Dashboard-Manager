import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private hostName: string = '';
  private routeName: string = '';
  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.orderRoute;
  }

  getAllOrders(
    limit: number = 50,
    page: number = 1,
    sort: string = '-createdAt',
    search: string
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  getOrder(orderId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}/${orderId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  updateDeliveredOrder(orderId: string): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${orderId}/delivered`,
      {},
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  updatePaidOrder(orderId: string): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${orderId}/paid`,
      {},
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }
}
