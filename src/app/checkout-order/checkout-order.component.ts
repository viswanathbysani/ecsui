import { Component, OnInit } from '@angular/core';
import { AppsessionService } from '../appsession.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.css']
})
export class CheckoutOrderComponent implements OnInit {
  selectedProducts : Product[];
  total:number;
  constructor(private sessionService:AppsessionService) { }

  ngOnInit() {
    this.total = 0;
    this.selectedProducts = this.sessionService.selectedProducts;
    if (this.selectedProducts.length > 0)
    {
      for (let i=0; i<this.selectedProducts.length; i++)
      {
        this.total += this.selectedProducts[i].price;
      }
      console.log("Total is >>" + this.total);
    }
  }

}
