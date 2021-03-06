import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppsessionService } from '../appsession.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[];
  selectedProducts:Product[];
  isManager:boolean;

  constructor(private invertoryService: InventoryService,
              private router:Router,
              private snackBar:MatSnackBar,
              private sessionService:AppsessionService) { }

  ngOnInit() {
  
    this.selectedProducts =[];
    this.isManager = this.sessionService.isManager;
    this.displayProducts();

  }
  displayProducts()
  {
    this.invertoryService.getAllProducts()
    .subscribe(products => this.products = products);
      //console.log("Products " + response));
    
  }
  onEnter(value:string)
  {
    if (value != '')
    {
      this.invertoryService.getProductsByNameOrDesc(value)
      .subscribe(products => this.products = products);
    }
    else
    {
      this.displayProducts();
    }
  }

  click(e)
  {
    if (e.target.checked)
    {
      for (var i=0; i<this.products.length; i++)
      {
        if (this.products[i].id == e.target.value)
        {
          this.selectedProducts.push(this.products[i]);
        }
      }
      
    }
    else
    {
      for( var i = 0; i < this.selectedProducts.length; i++){ 
        if ( this.selectedProducts[i].id === e.target.value) {
          this.selectedProducts.splice(i, 1); 
        }
     }
    }
  }

  editProduct(e)
  {
    //alert(e.target.value);
    this.router.navigate(['../edit-product/' + e.target.value]);
  }

  addToCart()
  {
    /*for( var i = 0; i < this.selectedProducts.length; i++){ 
      console.log(this.selectedProducts[i]);
    }*/
    if (localStorage.getItem('currentuser')) {
    
    if (this.selectedProducts.length > 0)
    {
      this.snackBar.open("Items are successfully added to cart","Ok");
      this.sessionService.selectedProducts = this.selectedProducts;
    }
    else
    {
      this.snackBar.open("Please select products before adding to cart","Ok");
    }
  }
   else 
   {
    this.router.navigate(['../sign-in']);
   }
  }
}
