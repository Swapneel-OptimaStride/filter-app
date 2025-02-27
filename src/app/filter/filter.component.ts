import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonGroupComponent, FormCheckInputDirective, FormCheckLabelDirective, FormModule, GridModule, ModalModule, PopoverModule, TooltipModule } from '@coreui/angular';
import { ExpressionComponent } from '../expression/expression.component';  

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonDirective, 
    ButtonGroupComponent, 
    FormCheckInputDirective, 
    FormCheckLabelDirective,
    FormModule, 
    GridModule, 
    ModalModule, 
    PopoverModule, 
    TooltipModule,
    ExpressionComponent
  ]
})
export class FilterComponent implements OnInit {
  categories: any[] = [];  
  opList: any[] = [];  
  formSections: any[] = [{ category: '', operation: '', value: '', isFact: false, relation: '' }];  // Form sections array
  selectedCategory: any;  // Selected category from the dropdown
  selectedOperation: any;  // Selected operation
  selectedIndex: number = 0;  // Default index
  operations = [
    { type: 'Number Operations', ops: ["=", ">", "<", "<=", ">=", "!="] },
    { type: 'String Operations', ops: ["startsWith", "endsWith", "contains", "hasLengthmorethan", "hasLengthlessthan", "hasLengthequalto", "hasLengthinbetween", "hasLengthnotinbetween", "hasLengthnotequal"] },
    { type: 'Boolean Operations', ops: ["=", "!="] }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch categories (facts) when the component initializes
    this.http.get<any[]>('http://localhost:3003/table').subscribe(
      (fields) => {
        console.log("setting categories in parent component");
        this.categories = fields; 
        console.log(this.categories); // Assuming you get categories/facts from the API
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Handle category change from ExpressionComponent
  handleCategoryChange(value: any, index: number) {
    console.log('Category changed:', value,"index",index);
    this.formSections[index].category = value;
    // Fetch operations based on selected category
    const categoryType = this.categories.find(cat => cat.name === value)?.type;
    console.log("categoryType", categoryType);
    const operationType = `${categoryType} Operations`;
    this.opList[index] = this.operations.find(op => op.type === operationType)?.ops || [];
  }

  // Handle operation change from ExpressionComponent
  handleOperationChange(value: any, index: number) {
    console.log('Operation changed:', value);
    this.formSections[index].operation = value;
  }

  // Handle type change from ExpressionComponent
  handleTypeChange(value: string, index: number) {
    console.log('Type changed:', value);
    this.formSections[index].isFact = value === 'fact';
  }

  // Handle relation change
  onRelationChange(event: any, index: number) {
    console.log('Relation changed:', event.target.value);
  }

  // Add a new form section
  totalComp: number = 0;
  createComponent() {
    this.formSections.push({ category: '', operation: '', value: '', isFact: false, relation: '' });
    this.opList.push([]); // Ensure opList has an entry for the new section
    this.totalComp = this.totalComp + 1;
  }

  // Submit form data
  onDone() {
    console.log(JSON.stringify(this.formSections, null, 2));
  }
}
