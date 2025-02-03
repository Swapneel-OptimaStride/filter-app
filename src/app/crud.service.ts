import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable, BehaviorSubject } from 'rxjs';
// import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productsListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // BehaviorSubject to track product list state
  productsList$ = this.productsListSubject.asObservable(); // Observable to be used by components

  constructor(private productSrv: ProductService) {}

  // Add product to the list
  addProduct(product: any) {
    const currentList = this.productsListSubject.getValue();
    this.productsListSubject.next([...currentList, product]); // Emit updated list
  }

  // Get products from productSrv and update the subject
  getProducts() {
    this.productSrv.getProducts().subscribe((res: any) => {
      // console.log(res, "Hey inside service");
      this.productsListSubject.next(res); // Update products list
    });
  }

  // View current products in the list (for logging)
  viewProducts() {
    console.log(this.productsListSubject.getValue());
  }
}
