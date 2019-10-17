import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Product } from './models/product';

const API_URL = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class InventoryService  {

  cart :string[];
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable <Product[]>
  {
    return this.http
      .get<Product[]>(API_URL + '/api/ecs/inventory/products' );
      //.pipe(catchError(this.handleError('getProducts')));
  }

  addProduct(product:Product)
  {
    return this.http
    .put(API_URL + '/api/ecs/inventory/products', product)
    .pipe(catchError(this.handleError('addProdct')));
  }

  updateProduct(product:Product)
  {
    return this.http
    .put(API_URL + '/api/ecs/inventory/products', product)
    .pipe(catchError(this.handleError('editProduct')));
  }

  getProductsByNameOrDesc(value:string): Observable <Product[]>
  {
     return this.http.get<Product[]>(API_URL+'/api/ecs/inventory/products/byNameorDesc/' + value);
  }

  getProductById(productId:string) :Observable<Product>
  {
    return this.http.get<Product>(API_URL+'/api/ecs/inventory//products/byId/'+ productId);
  }

  addToCart(products:string[])
  {
    this.cart=products;
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
