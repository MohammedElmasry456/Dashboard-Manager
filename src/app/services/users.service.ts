import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private hostName: string = '';
  private routeName: string = '';
  userImage: string = '';

  constructor(
    private _HttpClient: HttpClient,
    private _GlobalService: GlobalService
  ) {
    this.hostName = this._GlobalService.hostName;
    this.routeName = this._GlobalService.usersRoute;
    this.userImage = this._GlobalService.userImage;
  }

  getAllUsers(
    limit: number = 50,
    page: number = 1,
    sort: string = '-createdAt',
    search: string,
    role: string = 'admin'
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.hostName}${this.routeName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&role=${role}&fields=-password`,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  getUser(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.hostName}${this.routeName}/${userId}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  createUser(formData: any): Observable<any> {
    return this._HttpClient.post(
      `${this.hostName}${this.routeName}`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  updateUser(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${userId}`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  updateUserPassword(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.hostName}${this.routeName}/${userId}/changePassword`,
      formData,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.hostName}${this.routeName}/${userId}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }
}
