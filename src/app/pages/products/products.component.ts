import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  template:`
  <section class="products">
    <app-product 
      (addToCartClick)="addToCart($event)"
      [product]="product" *ngFor="let product of products"></app-product>
  </section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  //para consumir el servicio debemos inyectar en el constructor
  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap((products: Product[]) => this.products = products) //hacemos la peticion
    )
    .subscribe();
  }

  addToCart(product:Product):void{
    this.shoppingCartSvc.updateCart(product);
    
  }
}
