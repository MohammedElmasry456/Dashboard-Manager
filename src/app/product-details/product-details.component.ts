import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CommonModule} from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit,OnDestroy{
id:string ='';
img:string = '';
reviewError:string = '';
product:any={};
subscribe:any;

constructor(private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService,private _AuthService:AuthService){}

reviewForm = new FormGroup({
  comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
  rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
})

ngOnInit(): void {
  window.scrollTo(0, 0);
  this.id = this._ActivatedRoute.snapshot.params['id'];
  this.img =  this._ProductsService.productsImages;
  this.loadProduct();

}

loadProduct()
{
  this.subscribe=this._ProductsService.getProduct(this.id).subscribe((res)=>{
    this.product = res.data;
  })
}






ngOnDestroy(): void {
  this.subscribe.unsubscribe();

}
}
