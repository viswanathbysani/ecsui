import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromotionService } from '../promotion.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent implements OnInit {
  promotionForm:FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private promoService: PromotionService,
              private router: Router) { }

  ngOnInit() {
    this.promotionForm = this.formBuilder.group({
      code: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      expirationDate: ['',Validators.required],
    });
  }

  get f() { return this.promotionForm.controls; }

  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.promotionForm.invalid) {
        return;
    }

    this.promoService.addPromotion(this.promotionForm.value)
    .subscribe();
    //this.router.navigate(['home']);



  }
}
