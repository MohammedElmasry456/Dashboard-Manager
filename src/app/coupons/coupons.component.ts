import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit, OnDestroy{
  subscription: any;
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  coupons: any[] = [];

  constructor(private _AuthService: AuthService, private _CouponsService: CouponsService) { }

  getCoupons() {
    this.subscription = this._CouponsService.getAllCoupons(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.coupons = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }


  changeData(page: number) {
    this.page = page;
    this.getCoupons();
  }

  searchData(data: string) {
    this.search = data;
    this.getCoupons()
  }

  deleteCoupon(couponId: string) {
    this._CouponsService.deleteCoupon(couponId).subscribe({
      next: (res) => {
        this.getCoupons();
        alert('Coupon deleted')
      }, error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.getCoupons();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
