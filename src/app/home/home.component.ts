import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[];
  selectedProducts : Array<string>;

  constructor(private invertoryService: InventoryService,
              private router:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.selectedProducts =[];
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
      this.selectedProducts.push(e.target.value);
    }
    else
    {
      for( var i = 0; i < this.selectedProducts.length; i++){ 
        if ( this.selectedProducts[i] === e.target.value) {
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
