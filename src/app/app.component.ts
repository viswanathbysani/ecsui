import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecs';

  constructor(private router:Router){}
 
  public isLoggedin()
  {
     if (localStorage.getItem('currentuser'))
     {
       return true;
     }
     else
     {
       return false;
     }
  }
 
  logOut()
  {
    localStorage.removeItem('currentuser');
    this.router.navigate(['home']);
  }

  checkOutOrder()
  {
    this.router.navigate([])
  }
}
