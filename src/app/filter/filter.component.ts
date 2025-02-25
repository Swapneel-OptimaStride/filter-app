import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonDirective, ButtonGroupComponent, FormCheckInputDirective, FormCheckLabelDirective, FormModule, GridModule, ModalModule, PopoverModule, TooltipModule } from '@coreui/angular';
import { ExpressionComponent } from '../expression/expression.component';


interface Operations {
  index: number;
  operations: string[];
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ModalModule, GridModule, PopoverModule, TooltipModule,
    CommonModule, FormsModule, ButtonGroupComponent, ButtonDirective,
    FormCheckLabelDirective, ReactiveFormsModule, FormCheckInputDirective, FormModule, ExpressionComponent
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  title = 'filter-app';
  categories: any[] = [];  // Stores available categories (Facts)
  formSections: any[] = [{ category: '', operation: '', value: '', isFact: false, isLast:false}]; 
  OperationsList: Operations[] = [];
  selectedOperationType: string = '';
  valueOptions: any[] = [];  // Stores available values for dropdown
  isFactSelected: boolean[] = [];  // Tracks if a fact is selected for each section


  

  operations = [
    { type: 'Number Operations', ops: ["=", ">", "<", "<=", ">=", "!="] },
    { type: 'String Operations', ops: ["startsWith", "endsWith", "contains", "hasLengthmorethan", "hasLengthlessthan", "hasLengthequalto", "hasLengthinbetween", "hasLengthnotinbetween", "hasLengthnotequal"] },
    { type: 'Boolean Operations', ops: ["=", "!="] }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isFactSelected = new Array(this.formSections.length).fill(false);

    // Fetch categories (facts) when the component initializes
    this.http.get<any[]>('http://localhost:3003/table').subscribe(
      (fields) => {
        this.categories = fields;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  totalComp : number = 0;

  // Add a new form section
  createComponent() {
    this.formSections.push({ category: '', operation: '', value: '', isFact: false });
    this.isFactSelected.push(false);
    this.totalComp = this.totalComp + 1;
    // console.log(this.totalComp);
  }

  // Handle category selection (Facts Dropdown)
  // onSelectChange(event: any, index: number) {
  //   const selectedCategory = event.target.value;
  //   const selectedGroup = this.operations.find(group => group.type === `${selectedCategory} Operations`);

  //   if (selectedGroup) {
  //     this.OperationsList = selectedGroup.ops;
  //     this.selectedOperationType = selectedCategory;
  //   } else {
  //     this.OperationsList = [];
  //   }

  //   // Check if the selected category is a Fact
  //   const isFact = this.categories.some(category => category.type === 'fact' && category.name === selectedCategory);
  //   this.formSections[index].isFact = isFact;

  //   // If it's a Fact, update the value dropdown
  //   if (isFact) {
  //     this.updateValueDropdown(index);
  //   }
  // }

   selectedGroup: any[] = []; 
   opList: any[] = [];
  
   onSelectChange(event: any, index: number) {
    const selectedCategory = event.target.value;
    this.formSections[index].category = selectedCategory; // Store the selected category
  
    console.log("Selected Category:", selectedCategory);  // Log the selected category
  
    // Find the selected operations group based on the category
    const selectedGroup = this.operations.find(group => group.type === `${selectedCategory} Operations`);
    console.log("Selected Group:", selectedGroup);  // Log the selected group
  
    // Check if the selected group exists
    if (selectedGroup) {
      // If the index already exists in OperationsList, update it
      const existingIndex = this.OperationsList.find(op => op.index === index);
      
      if (existingIndex) {
        // Update the operations array for the existing index
        existingIndex.operations = selectedGroup.ops;
      } else {
        // If no existing entry, create a new entry for that index
        this.OperationsList.push({ index, operations: selectedGroup.ops });
      }
  
      console.log('Updated OperationsList:', this.OperationsList);  // Log updated OperationsList
      this.opList[index] = this.OperationsList[index].operations;
      console.log("OpList:", this.opList);  
    } else {
      // If no operations group found, you can either leave it empty or handle accordingly
      const existingIndex = this.OperationsList.find(op => op.index === index);
      
      if (existingIndex) {
        existingIndex.operations = []; // Clear operations for the index
      } else {
        this.OperationsList.push({ index, operations: [] });
      }
  
      console.log('No matching operations found, setting empty operations list');
    }
  
    // Check if the selected category is a fact and update isFact
    const isFact = this.categories.some(category => category.type === 'fact' && category.name === selectedCategory);
    this.formSections[index].isFact = isFact;
  
    // If it's a fact, update the value dropdown
    if (isFact) {
      this.updateValueDropdown(index);
    }
  }
  
  
  
  // Handle operation selection
  selectOperation(event: any, index: number) {
    this.formSections[index].operation = event.target.value;
  }

  // Handle Fact selection from the last dropdown
  onFactSelected(event: any, index: number) {
    const selectedValue = event.target.value;
    this.formSections[index].value = selectedValue;
    this.formSections[index].isFact = true;
  }

 
  // Update value dropdown when a fact is selected
updateValueDropdown(index: number) {
  const selectedFactType = this.formSections[index].category;

  this.http.get<any[]>('http://localhost:3003/table').subscribe(
    (fields) => {
      // Filter out facts of the selected type, excluding the one that was already selected for this section
      const filteredFacts = fields.filter(field => field.type === selectedFactType && field.name !== this.formSections[index].value && field.name !== this.formSections[index].category);
      this.valueOptions = filteredFacts; // Update value options with filtered facts
      console.log(this.valueOptions);
    },
    (error) => {
      console.error('Error fetching values:', error);
    }
  );
}


  // Check if the selected category is a Fact
  // isFieldCheckedForSection(index: number): boolean {
  //   // console.log(`Checking if field is a Fact for section ${index}`);
  //   return this.formSections[index].isFact;
  // }
  // isFieldCheckedForSection(index: number): boolean {
  //   return this.formSections[index].isFact;
  // }
  isFieldCheckedForSection(index: number): boolean {
    return this.formSections[index].isFact;
  }
  

  // Handle type selection
  // onTypeChange(event: Event, index: number) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   console.log(`Selected type for section ${index}: ${selectedValue}`);
  // }

  // Submit form data
  onDone() {
    console.log(JSON.stringify(this.formSections, null, 2));
  }

  vcr = inject(ViewContainerRef);

  StoreChange(event: any) {
    console.log(event);
  }
  // onTypeChange(value: string,id:number){
  //   console.log(value,id);
  //   if(value == 'fact') 
  //   {
  //     this.formSections[id].isFact = true;
  //   }
      

  // }
  onTypeChange(value: string, id: number): void {
    console.log(value, id);
    console.log(id);
    
    // Update the type for the corresponding form section
    this.formSections[id].type = value;
    console.log(this.formSections[id].type);

    // If the type is 'value', set isFact to true
    if (value === 'value') {
      this.formSections[id].isFact = true;
      this.updateValueDropdown(id);
    } else {
      this.formSections[id].isFact = false;
      // console.log(this.formSections[id].isFact);
      
    }
  }


}
