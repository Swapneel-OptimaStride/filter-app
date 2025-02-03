import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getCategory() {
    return this.http.get(Constant.Categories_API_END_POINT+Constant.METHODS.GET_ALL_CATEGORY);
  }
  getProducts() {
    // console.log("Updated");
    return this.http.get(Constant.API_END_POINT+Constant.METHODS.GET_ALL_PRODUCT);
  }
  saveProduct(obj: any) {
    // console.log("123", this.http.post(Constant.API_END_POINT+Constant.METHODS.CREATE_PRODUCT,obj));
    
    return this.http.post(Constant.API_END_POINT+Constant.METHODS.CREATE_PRODUCT,obj,{observe: 'response'});
  }
  updateProduct(obj: any) {
    return this.http.put(Constant.API_END_POINT+Constant.METHODS.UPDATE_PRODUCT+obj.id, obj);
  }
  deleteProduct(id: any) {
    console.log();
    
    return this.http.delete(Constant.API_END_POINT+Constant.METHODS.DELETE_PRODUCT+id);
  
 }
}
