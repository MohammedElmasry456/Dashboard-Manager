import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports:  [ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit, OnDestroy{
  categoriesSubscription: any;
  subcategoriesSubscription: any;
  productSubscription: any;
  product:any={};
  productId:string='';
  categories: any[] = [];
  subcategories: any[] = [];
  getCategory: string = '';
  getSubcategory: string = '';
  getName: string = '';
  getDescription: string = '';
  getPrice: string = '0';
  getQuantity: string = '0';
  productCover: any;
  productImages: any[] = [];
  setCategory:string='';
  setsubCategory:string='';

  setCover(event: any) {
    const cover = event.target.files[0]
    if (cover) { this.productCover = cover };
  }
  setImages(event: any) {
    const images = event.target.files;
    if (images) { this.productImages = images };
  }
  constructor(private _AuthService: AuthService, private _ActivatedRoute:ActivatedRoute,private _ProductsService: ProductsService, private _CategoriesService: CategoriesService,
    private _SubcategoriesService: SubcategoriesService, private _Router: Router
  ) { }

  loadCategories() {
    this.categoriesSubscription = this._CategoriesService.getCategories(200, 1, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      }, error: (err) => { }
    })
  }

  loadSubcategories(categoryId: string) {
    this.getCategory = categoryId;
    this.subcategoriesSubscription = this._SubcategoriesService.getSpecificSubcategories(categoryId, 200, 'name').subscribe({
      next: (res) => {
        this.subcategories = res.data;
      }
    })
  }

  loadProduct()
  {
    this.productSubscription = this._ProductsService.getProduct(this.productId).subscribe({
      next:(res)=>{
        console.log(res)
        this.product = res.data;
        this.setCategory = this.product.category.name;
        this.setsubCategory = this.product.subcategory.name;
      },error:(err)=>{}
    })
  }

  formDataToObject(formData:any) {
    const object:any = {};
    formData.forEach((value:any, key:any) => {
      // إذا كان المفتاح موجود بالفعل في الكائن، قم بتحويله إلى مصفوفة أو إضافة عنصر جديد إلى المصفوفة
      if (object[key]) {
        if (Array.isArray(object[key])) {
          object[key].push(value);
        } else {
          object[key] = [object[key], value];
        }
      } else {
        object[key] = value;
      }
    });
    return object;
  }
  updateProduct() {
    let formData = new FormData();
    formData.append('name', this.getName || this.product.name || '');
    formData.append('description', this.getDescription || this.product.description || '');
    formData.append('category', this.getCategory || this.product.category?._id || '');
    formData.append('subcategory', this.getSubcategory || this.product.subcategory?._id || '');
    formData.append('price', this.getPrice || this.product.price || '0');
    formData.append('quantity', this.getQuantity || this.product.quantity || '0');

    if (this.productCover) {
      formData.append('cover', this.productCover);
    }

    if (this.productImages && this.productImages.length > 0) {
      for (let i = 0; i < this.productImages.length; i++) {
        formData.append('images', this.productImages[i]);
      }
    }
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    formData = this.formDataToObject(formData);
    this._ProductsService.updateProduct(this.productId, formData).subscribe({
      next: (res) => {
        console.log(res);
        alert('Product updated successfully');
        this._Router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }


  ngOnInit(): void {
    this._AuthService.checkToken()
    this.productId = this._ActivatedRoute.snapshot.params['id'];
    this.loadProduct();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    if (this.subcategoriesSubscription) {
      this.subcategoriesSubscription.unsubscribe();
    }
  }
}
