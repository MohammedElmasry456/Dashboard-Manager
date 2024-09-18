import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private hostName: string = '';
  private routeName: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.categoriesRoute;
  }

  getCategories(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${categoryId}`)
  }

  createCategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  updateCategory(categoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/${categoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}/${categoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
