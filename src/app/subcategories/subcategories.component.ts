import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { Pagination } from '../interfaces/pagination';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  subcategories: any[] = [];
  pagination: Pagination ={};
  page: number = 1;
  search: string = '';
  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService) { };

  getSubcategories() {
    this.subscription = this._SubcategoriesService.getSubcategories(50, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.subcategories = res.data;
        this.pagination = res.pagination;
      }, error: (err) => { }
    })
  }

  deleteSubcategory(subCategoryId: string) {
    this._SubcategoriesService.deleteSubcategory(subCategoryId).subscribe({
      next: (res) => {
        this.getSubcategories();
        alert('Subcategory deleted')
      }, error: (err) => { }
    })
  }

  changeData(page: number) {
    this.page = page;
    this.getSubcategories();
  }

  searchData(data: string) {
    this.search = data;
    this.getSubcategories()
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.getSubcategories();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
