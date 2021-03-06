import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutOrderComponent } from './checkout-order/checkout-order.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'home',
    component: HomeComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'add-product',
    component:AddProductComponent
  },
  {
    path: 'edit-product/:id',
    component:EditProductComponent
  },
  {
    path:'checkout',
    component:CheckoutOrderComponent
  },
  {
    path:'add-promotion',
    component:AddPromotionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
