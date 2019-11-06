import { Injectable } from '@angular/core';
import { AppsessionService } from './appsession.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

const API_URL = 'http://localhost:8081';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private sessionService:AppsessionService,
    private http: HttpClient) { }

  placeOrder(promotion:number, cardNo:string)
  {
    console.log("prmocode " + promotion);
    console.log("card no " + cardNo);
     let productIds = "";
     let userName = this.sessionService.userName;
    for (let i=0; i<this.sessionService.selectedProducts.length; i++)
    {
      productIds += this.sessionService.selectedProducts[i].id;
      productIds += ',';
    }
    console.log("products " + productIds );
    
    return this.http
      .post(API_URL + '/api/ecs/inventory/processorder', {
        userName,
        productIds,
        promotion,
        cardNo
      })
      .pipe(catchError(this.handleError('placeOrder')));
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
