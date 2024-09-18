import { Component } from '@angular/core';
import { SubcategoriesService } from '../services/subcategories.service';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-update-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.scss'
})
export class UpdateSubcategoryComponent {
  subscription: any;
  id: string = '';
  categories:any=[];
  subcategory: any = '';
  subcategoryError: string = '';
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  })
  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService,private _CategoriesService:CategoriesService,
    private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  getsubCategory(subcategoryId: string) {
    this.subscription = this._SubcategoriesService.getSubcategory(subcategoryId).subscribe({
      next: (res) => {
        this.subcategory = res.data
      },
      error: (err) => {
        this.subcategoryError = err.error.message
      }
    })
  }

  getAllCategories() {
    this.subscription = this._CategoriesService.getCategories(200, undefined, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data
      }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.getsubCategory(this.id);
    this.getAllCategories();
  }

  updatesubCategory(subcategoryId: string, formData: FormGroup) {
    this._SubcategoriesService.updateSubcategory(subcategoryId, formData.value).subscribe({
      next: (res) => {
        alert('subcategory updated');
        this._Router.navigate(['/subcategories']);
      },
      error: (err) => { this.subcategoryError = err.error.errors[0].msg }
    })
  }


  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
