import { Injectable } from '@angular/core';
import { Promotion } from './models/promotion';
import { catchError } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8082';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }
  addPromotion(promotion:Promotion)
{
  return this.http
  .put(API_URL + '/api/ecs/promotion/save', promotion)
  .pipe(catchError(this.handleError('addPromotion')));
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


