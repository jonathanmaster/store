import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";


@Injectable(
    {providedIn: 'root'}
)
export class ShoppingCartService{

    products: Product[] = [];

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    //metodo para que lo consuman y mostrar el total
    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }

    //metodo ayuda actualizar el carrito
    updateCart(product:Product):void{
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }

    // metodo no devuelve nada pero devuelve algo al carrito
    private addToCart(product:Product):void{
        this.products.push(product);
        this.cartSubject.next(this.products);
    }


    //metodo para extraer todos los product que esta en el carrito
    private quantityProducts():void{
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }


    //para calcular la orden que pidieron
    private calcTotal():void{
        const total = this.products.reduce((acc,prod) => acc += prod.price, 0)
        this.totalSubject.next(total); //para mostrar el valor con el metodo next
    }
}



