import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  hostName: string ='http://localhost:3000/';
  authRoute: string = 'api/v1/auth';
  orderRoute: string = 'api/v1/orders';
  couponRoute: string = 'api/v1/coupons';
  categoriesRoute: string = 'api/v1/categories';
  subcategoriesRoute: string = 'api/v1/subcategories';
  productsRoute: string = 'api/v1/products';
  usersRoute: string = 'api/v1/users';
  reviewsRoute:string = 'api/v1/reviews';
  productsImages: string = `${this.hostName}products/`;
  userImage: string = `${this.hostName}/users/`;
  constructor() { }
}
