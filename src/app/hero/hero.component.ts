import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DescriptionPipe } from '../pipes/description.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink,DescriptionPipe,CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit,OnDestroy{
  constructor(private _ProductsService: ProductsService,private _AuthService:AuthService) {}

  products: any[] = [];
  img:string = '';
  subscribe:any;

  ngOnInit() {
      this.subscribe = this._ProductsService.getAllProducts(16,1,'-sold','').subscribe((res) => {
      this.products = res.data;
      this.img = this._ProductsService.productsImages;
    });
  }




  ngOnDestroy()
  {
    this.subscribe.unsubscribe();
  }
}
