import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../product';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));

    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitialiseCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
