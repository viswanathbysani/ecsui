import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class AppsessionService {
  selectedProducts : Product[];

  constructor() { }
}
