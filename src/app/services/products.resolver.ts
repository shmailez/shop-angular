import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn,
} from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { IProducts } from '../models/propducts';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolver implements Resolve<IProducts> {
  constructor(
    private ProductService: ProductsService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProducts> {
    return this.ProductService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}
