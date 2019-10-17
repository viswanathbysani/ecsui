import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap,  catchError } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  isLoggedin = false;

  constructor(private http: HttpClient) {
    
   }


   public signIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/api/ecs/login', {
        username,
        password
      })
      .pipe(catchError(this.handleError('signIn')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
