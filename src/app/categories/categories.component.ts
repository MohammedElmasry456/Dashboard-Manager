import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: any[] = [];
  pagination:Pagination={};
  page: number = 1;
  search: string = '';
  constructor(private _AuthService: AuthService, private _CategoriesService: CategoriesService) { }

  getCategories() {
    this.subscription = this._CategoriesService.getCategories(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.getCategories();
  }

  deleteCategory(categoryId: string) {
    this._CategoriesService.deleteCategory(categoryId).subscribe({
      next: (res) => {
        this.getCategories();
        alert('Category deleted')
      }, error: (err) => { }
    })
  }

  changeData(page: number) {
    this.page = page;
    this.getCategories();
  }

  searchData(data: string) {
    this.search = data;
    this.getCategories()
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
