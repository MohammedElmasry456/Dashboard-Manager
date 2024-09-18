import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'home', title: 'home',canActivate: [authGuard],loadComponent:()=>import('./home/home.component').then(m=>m.HomeComponent)},
  { path: 'products',title:"products",canActivate: [authGuard], loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'users',title:"users",canActivate: [authGuard,rolesGuard], loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'categories',canActivate: [authGuard],
   children:[
    {path:'', title: 'Categories',loadComponent:()=>import('./categories/categories.component').then(m=>m.CategoriesComponent)},
    {path:'create', title: 'create-Category',loadComponent:()=>import('./create-category/create-category.component').then(m=>m.CreateCategoryComponent)},
    {path:':id', title: 'update-Category',loadComponent:()=>import('./update-category/update-category.component').then(m=>m.UpdateCategoryComponent)},
  ]},
  { path: 'subcategories',canActivate: [authGuard],
    children:[
     {path:'', title: 'subCategories',loadComponent:()=>import('./subcategories/subcategories.component').then(m=>m.SubcategoriesComponent)},
     {path:'create', title: 'create-subCategory',loadComponent:()=>import('./create-subcategory/create-subcategory.component').then(m=>m.CreateSubcategoryComponent)},
     {path:':id', title: 'update-subCategory',loadComponent:()=>import('./update-subcategory/update-subcategory.component').then(m=>m.UpdateSubcategoryComponent)},
   ]},
   { path: 'coupons', canActivate: [authGuard],
    children: [
      { path: '', title: 'coupons', loadComponent: () => import('./coupons/coupons.component').then(m => m.CouponsComponent) },
      { path: 'create', title: 'create coupon', loadComponent: () => import('./create-coupon/create-coupon.component').then(m => m.CreateCouponComponent) },
      { path: ':id/update', title: 'update coupon', loadComponent: () => import('./update-coupon/update-coupon.component').then(m => m.UpdateCouponComponent) }
    ]
  },
  { path: 'orders', canActivate: [authGuard],
    children: [
      { path: '', title: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
    ]
  },
  {path: 'users', canActivate: [authGuard, rolesGuard],
    children: [
      { path: '', title: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
      { path: 'create', title: 'create user', loadComponent: () => import('./add-user/add-user.component').then(m => m.AddUserComponent) },
      { path: ':id', title: 'user details', loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent) },
    ]
  },
  { path: 'profile', title: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'products',canActivate: [authGuard],
    children:[
     {path:'', title: 'products',loadComponent:()=>import('./products/products.component').then(m=>m.ProductsComponent)},
     {path:'create', title: 'create-product',loadComponent:()=>import('./create-product/create-product.component').then(m=>m.CreateProductComponent)},
     {path:':id/update', title: 'update-product',loadComponent:()=>import('./update-product/update-product.component').then(m=>m.UpdateProductComponent)},
     {path: ':id', title: 'Product details', loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent) },
   ]},
   { path:'forgetPassword',title:'forgetPassword',loadComponent:()=>import('./forget-password/forget-password.component').then(m=>m.ForgetPasswordComponent)},
  { path: '**',title:'404 Not Found', component:NotFoundComponent}
];
