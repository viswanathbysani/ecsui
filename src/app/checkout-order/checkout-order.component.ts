import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../appsession.service';
import { Product } from '../models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.css']
})
export class CheckoutOrderComponent implements OnInit {
  orderForm: FormGroup;
  selectedProducts : Product[];
  total:number;
 
  constructor(private sessionService:AppsessionService,
    private orderService:OrderService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      promoCode: [''],
      cardNo: ['', Validators.required]
    });
    
    this.total = 0;
    this.selectedProducts = this.sessionService.selectedProducts;
    if (this.selectedProducts.length > 0)
    {
      for (let i=0; i<this.selectedProducts.length; i++)
      {
        this.total += this.selectedProducts[i].price;
      }
     // console.log("Total is >>" + this.total);
    }
  }

  onSubmit()
  {
    this.orderService.placeOrder(this.orderForm.get('promoCode').value,
      this.orderForm.get('cardNo').value).subscribe(); ;
  }

}
