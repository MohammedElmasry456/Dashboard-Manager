import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
  category: any = {};
  categoryError: string = '';
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })
  constructor(private _AuthService: AuthService, private _CategoriesService: CategoriesService, private _Router: Router) { }

  createCategory(formData: FormGroup) {
    this._CategoriesService.createCategory(formData.value).subscribe({
      next: (res) => {
        alert('category added');
        this._Router.navigate(['/categories'])
      },
      error: (err) => { this.categoryError = err.error.errors[0].msg }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }
}
