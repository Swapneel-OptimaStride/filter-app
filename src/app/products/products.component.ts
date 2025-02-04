import { Component } from '@angular/core';
import { DefaultHeaderComponent, DefaultLayoutComponent } from '../layout';
import { LayoutComponent } from '../views/forms/layout/layout.component';
import { inject, OnInit } from '@angular/core';
import { ButtonModule, CardComponent, CollapseModule, ContainerComponent, GridModule, NavModule, OffcanvasModule, OffcanvasService, PaginationModule } from '@coreui/angular';  // Import the CoreUI Offcanvas module
import { CardModule, FormModule, NavbarModule } from '@coreui/angular';  // Other CoreUI modules
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { FormComponent } from './form/form.component';  // Custom form component
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CardComponent1 } from "./card/card.component";
import { FormControl, FormGroup } from '@angular/forms';
// import { CrudService } from './crud.service';
// import { ProductService } from './product.service';
// import { log } from 'console';
import { FormComponent } from '../form/form.component';
// import { CardComponent1 } from '../card/card.component';
import { CrudService } from '../crud.service';
import { ProductService } from '../product.service';
import { DataformService } from '../dataform.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [DefaultHeaderComponent,DefaultLayoutComponent,LayoutComponent,
    CardModule,
    FormModule,
    NavbarModule,
    OffcanvasModule, // CoreUI Offcanvas module
    FormComponent,
    ButtonModule,
    NavbarModule,
    GridModule,
    CollapseModule,
    NavModule,
    PaginationModule,
    CardComponent
    // BrowserAnimationsModule
    ,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
    title = 'ecommerce';
      
      productObj: any = {
        "id": "",
        "productSku": "",
        "productName": "",
        "productPrice": 0,
        "productShortName": "",
        "productDescription": "",
        "createdDate":new Date(),
        "deliveryTimeSpan": "",
        "categoryId": 0,
        "productImageUrl": ""
      };
      
      
      
      flag :any = true;
       oldName: any = "";
       finalList:any[] = [];
       products: any[] = [];
    
       constructor(private crudService: CrudService, private productSrv: ProductService,private dataForm: DataformService)
       {
        // this.getProductsTotal();
       }
       ngOnInit(): void {
        // Get products on component initialization
        this.crudService.getProducts();
    
        // Subscribe to the productsList$ observable to track changes
        this.crudService.productsList$.subscribe((products: any[]) => {
          this.products = products; // Update the local products array whenever the products list changes
          // console.log(this.products, 'Updated products list');
        });
      }
    
   
    // makefieldsBlank()
    // {
    //   this.productForm = new FormGroup({
    //     id: new FormControl(0),
    //     productName: new FormControl(''),
    //     productSku: new FormControl(''),
    //     productPrice: new FormControl(''),
    //     productShortName: new FormControl(''),
    //     productDescription: new FormControl(''),
    //     deliveryTimeSpan: new FormControl(''),
    //     categoryId: new FormControl(''),
    //     productImageUrl: new FormControl(''),
    //   });
    makefieldsBlank()
    {
      this.dataForm.makeFieldsBlank();
    }
    onEdit(item:any)
    {
      // console.log(item);
      this.dataForm.prodObj = item;
      this.dataForm.viewData();
      
      
  
    }
    // onUpdate()
    // {
    //   this.productSrv.updateProduct(this.productObj).subscribe((res:any)=>{
    //     if(res)
    //     {
    //       alert("product updated ");
          
         
    //       this.productObj = {
    //         "id": "",
    //         "productSku": "",
    //         "productName": "",
    //         "productPrice": 0,
    //         "productShortName": "",
    //         "productDescription": "",
    //         "createdDate": new Date(),
    //         "deliveryTimeSpan": "",
    //         "categoryId": 0,
    //         "productImageUrl": ""
    //       };
    
    //       this.productSrv.getProducts();
    
    //     }
    //     else
    //     {
    //       alert(res.message);
    //     }
    //   });
    // }
    onDelete(item:any)
    {
      console.log(item.productName);
      
      const isDelete = confirm("Do you want to delete this product?");
      if(isDelete)
        {
          this.productSrv.deleteProduct(item.id).subscribe((res:any)=>{
            console.log(res);
            
            if(res)
            {
              alert("product deleted");
              this.crudService.getProducts();
            }
            else
            {
              alert(res.message);
            }
          });
    }
  }
  
  }