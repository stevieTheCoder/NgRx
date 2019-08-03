import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { EffectsFeatureModule } from '@ngrx/effects/src/effects_feature_module';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(action =>
      this.productService.getProducts().pipe(
        map(products => new productActions.LoadSuccess(products)),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map(updatedProduct => new productActions.UpdateProductSuccess(updatedProduct)),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map(createdProduct => new productActions.CreateProductSuccess(createdProduct)),
        catchError(err => of(new productActions.CreateProductFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((id: number) =>
      this.productService.deleteProduct(id).pipe(
        map(() => new productActions.DeleteProductSuccess(id)),
        catchError(err => of(new productActions.DeleteProductFail(err)))
      )
    )
  );
}
