import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: any;
  productImage: string = '';
  products: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  search: string = '';
  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(50, this.page, 'category subcategory name', this.search).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  changeData(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchData(data: string) {
    this.search = data;
    this.loadProducts()
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._ProductsService.productsImages;
    this.loadProducts();
  }

  deleteProduct(productId: string) {
    this._ProductsService.deleteProduct(productId).subscribe({
      next: (res) => {
        this.loadProducts();
        alert('product deleted');
      }, error: (err) => { }
    })
  }


  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
