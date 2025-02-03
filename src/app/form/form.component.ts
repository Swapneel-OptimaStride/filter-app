// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './form.component.html',
//   styleUrl: './form.component.scss'
// })
// export class FormComponent {


// }
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CrudService } from '../crud.service';
import { ProductService } from '../product.service';
import { DataformService } from '../dataform.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {


  
  // productObj: any = {
  //   "id": "",
  //   "productSku": "",
  //   "productName": "",
  //   "productPrice": 0,
  //   "productShortName": "",
  //   "productDescription": "",
  //   "createdDate":new Date(),
  //   "deliveryTimeSpan": "",
  //   "categoryId": 0,
  //   "productImageUrl": ""
  // };
  
  categoryList:any [] = [];

  public productForm: FormGroup = new FormGroup({
  });

  initializeForm() {
    this.productForm = new FormGroup({
      id: new FormControl(0),
      productName: new FormControl(''),
      productSku: new FormControl(''),
      productPrice: new FormControl(''),
      productShortName: new FormControl(''),
      productDescription: new FormControl(''),
      deliveryTimeSpan: new FormControl(''),
      categoryId: new FormControl(''),
      productImageUrl: new FormControl(''),
    });
  }
  constructor(private crudService: CrudService,private productSrv: ProductService,private dataSrv: DataformService)
  {
    this.initializeForm();
  }


//  onClick()
//  {
//   alert('Submit button hit');
//   this.crudService.addProduct(this.productForm.value);
//   // this.crudService.viewProducts();
//   this.makefieldsBlank();
//  }
 makefieldsBlank()
 {
   this.productForm = new FormGroup({
     id: new FormControl(0),
     productName: new FormControl(''),
     productSku: new FormControl(''),
     productPrice: new FormControl(''),
     productShortName: new FormControl(''),
     productDescription: new FormControl(''),
     deliveryTimeSpan: new FormControl(''),
     categoryId: new FormControl(''),
     productImageUrl: new FormControl(''),
   });
 }
 getAllCategory()
  {
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;

    });

  }
  ngOnInit(): void {

    this.getAllCategory();
    this.dataSrv.observeProduct.subscribe((data)=>
      {
        console.log("watching in form - value changed");
        
        this.productForm.patchValue(data);
      });
      
      this.productForm.patchValue(this.dataSrv.prodObj);
  }

  onSave()
  {
    let prodForApi: any  = {
      "id": this.productForm.value.id,
      "productSku": this.productForm.value.productSku,
      "productName": this.productForm.value.productName,
      "productPrice": this.productForm.value.productPrice,
      "productShortName": this.productForm.value.productShortName,
      "productDescription": this.productForm.value.productDescription,
      "createdDate": this.productForm.value.createdDate,
      "deliveryTimeSpan": this.productForm.value.deliveryTimeSpan,
      "categoryId": this.productForm.value.categoryId,
      "productImageUrl": this.productForm.value.productImageUrl
    }
    // this.crudService.addProduct(prodForApi);
    this.productSrv.saveProduct(prodForApi).subscribe((res:any)=>{
     // console.log(res);
      
      if(res)
      {
        console.log(res);
        
        alert("product Created");
        
        this.crudService.getProducts();
        this.makefieldsBlank();
        this.crudService.viewProducts();

      }
      else
      {
        alert(res.message);
      }
    });
  }

  dummyObj: any[] = [];

  // patchValueinForm()
  // {
   
    
   
  // }

 




}
