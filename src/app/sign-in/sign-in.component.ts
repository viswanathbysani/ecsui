import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debug } from 'util';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AppsessionService } from '../appsession.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public frm: FormGroup;
  public errmsg:string;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;
  constructor(private fb: FormBuilder,
    private api: ApiService,
    private sessionService : AppsessionService,
    private router: Router) { 
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public doSignIn() {

    // Make sure form values are valid
    if (this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

   
    this.api
      .signIn(username, password)
      .subscribe(
        (response:{name:string}) => {
          console.log("welcome to CMS Site " + response.name);
          if (response.name != null)
          {
            localStorage.setItem('currentuser',response.name);
            this.sessionService.userName = username;
           // if manager logged in set the flag in session
            if (response.name.trim() == "MGRECS"  )
            {
              this.sessionService.isManager = true;
            }
            else
            {
              this.sessionService.isManager = false;
            }
            //alert(localStorage.getItem('currentuser'));
            this.api.isLoggedin = true;
            this.router.navigate(['home']);
          }
          else
          {
            this.isBusy = false;
            this.hasFailed = true;
            this.router.navigate(['sign-in']);
          }
        },
        (error) => {
          this.isBusy = false;
          this.hasFailed = true;
        }
      );
  }

  

}
