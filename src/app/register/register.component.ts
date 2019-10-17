import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService) {
    
   }

   get f() { return this.registerForm.controls; } 
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      email: ['',Validators.email],
      address:[''],
      member:[false]
  });
  }

  registerUser()
  {
    
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
        this.userService.register(this.registerForm.value)
        .subscribe(
          (response:{name:string}) => {
            console.log("Registration Successful " + response.name);
          });
  }

}
