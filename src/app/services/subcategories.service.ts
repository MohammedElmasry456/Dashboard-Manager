import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private hostName: string = '';
  private routeName: string = '';
  private categoriesRoute: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.subcategoriesRoute;
    this.categoriesRoute = this._GlobalService.categoriesRoute;
  }

  getSubcategories(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
  }

  getSpecificSubcategories(categoryId: string, limit: number = 200, sort: string = 'name'): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.categoriesRoute}/${categoryId}/subcategories?limit=${limit}&sort=${sort}`)
  }

  getSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${subcategoryId}`)
  }

  createSubcategory(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.hostName}${this.routeName}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  updateSubcategory(subcategoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.hostName}${this.routeName}/${subcategoryId}`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }

  deleteSubcategory(subcategoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.hostName}${this.routeName}/${subcategoryId}`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
