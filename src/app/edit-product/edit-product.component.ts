import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { InventoryService } from '../inventory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id:string;
  product:Product;
  productForm: FormGroup;
  submitted = false;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private service:InventoryService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
   
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      reorderThreshhold: [''],
      stopOrder:[false],
      stock:['']
    });
     this.getProductDetails();
  }

  getProductDetails()
  {
     this.id = this.route.snapshot.params.id
     this.service.getProductById(this.id)
    .subscribe(product => this.productForm.patchValue(product))
    ;
   // console.log ("Product details" + this.prodcut); 
  }

  get f() { return this.productForm.controls; } 
  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }

    this.product = this.productForm.value;
    this.product.id = this.id;
    this.service.updateProduct(this.product)
    .subscribe();
    this.router.navigate(['home']);
  }
}
