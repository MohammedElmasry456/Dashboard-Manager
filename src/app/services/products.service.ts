import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private hostName: string = '';
  private routeName: string = '';
  productsImages: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.productsRoute;
    this.productsImages = this._GlobalService.productsImages;
  }

  getAllProducts(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${productId}`);
  }

  createProduct(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  updateProduct(productId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/${productId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  deleteProduct(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}/${productId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
