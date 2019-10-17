import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private inventoryService : InventoryService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      orderThreshhold: [''],
      stopOrder:[false],
      stock:['']
    });
  }

  get f() { return this.productForm.controls; } 
  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }

    this.inventoryService.addProduct(this.productForm.value)
    .subscribe();
    this.router.navigate(['home']);



  }

}
