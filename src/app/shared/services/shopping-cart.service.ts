import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";


@Injectable(
    {providedIn: 'root'}
)
export class ShoppingCartService{

    products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

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

    //metodo para resetear el carrito
    resetCart():void{
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
    }

    // metodo no devuelve nada pero devuelve algo al carrito
    private addToCart(product:Product):void{
        const isProductInCart = this.products.find( ({id}) => id === product.id) //es por si queremos agregar el mismo una vez mas

        //si el metodo find no encuentra nada se va pa el else
        if(isProductInCart){
            isProductInCart.qty +=1;
        }else{
            this.products.push({... product, qty: 1})
        }

        this.cartSubject.next(this.products);
    }


    //metodo para extraer todos los product que esta en el carrito
    private quantityProducts():void{
        const quantity = this.products.reduce((acc,prod) => acc += prod.qty, 0);
        this.quantitySubject.next(quantity);
    }


    //para calcular la orden que pidieron
    private calcTotal():void{
        const total = this.products.reduce((acc,prod) => acc += (prod.price * prod.qty), 0)
        this.totalSubject.next(total); //para mostrar el valor con el metodo next
    }
}




