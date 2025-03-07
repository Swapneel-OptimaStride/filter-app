import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonGroupComponent, FormCheckInputDirective, FormCheckLabelDirective, FormModule, GridModule, ModalModule, PopoverModule, TooltipModule } from '@coreui/angular';
import { ExpressionComponent } from '../expression/expression.component';  
import { Expression } from '../../expression';

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
  facts: any[] = [];  
  opList: any[] = [];  
  expressions: any[] = [{ category: '', operation: '', value: '', isFact: false, relation: '' }];  // Form sections array
  selectedCategory: any;  // Selected category from the dropdown
  selectedOperation: any;  // Selected operation
  selectedIndex: number = 0; 

  operations = [
    { type: 'Number Operations', ops: ["=", ">", "<", "<=", ">=", "!="] },
    { type: 'String Operations', ops: ["startsWith", "endsWith", "contains", "hasLengthmorethan", "hasLengthlessthan", "hasLengthequalto", "hasLengthinbetween", "hasLengthnotinbetween", "hasLengthnotequal"] },
    { type: 'Boolean Operations', ops: ["=", "!="] }
  ];// Default index

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch categories (facts) when the component initializes
    this.http.get<any[]>('http://localhost:3003/table').subscribe(
      (fields) => {
        console.log("setting categories in parent component",fields);
        this.facts = fields; 
        console.log(this.facts); // Assuming you get categories/facts from the API
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Handle category change from ExpressionComponent
  handleCategoryChange(event: any, index: number) {
    const value = event.value;
    console.log('Category changed:', value);
    this.expressions[index].category = value;
    // Fetch operations based on selected category
    const categoryType = this.facts.find(cat => cat.name === value)?.type;
    console.log('Category type:', categoryType);
    if (categoryType === 'string') {
      this.opList[index] = this.operations.find(op => op.type === 'String Operations')?.ops || [];
    } else if (categoryType === 'number') {
      this.opList[index] = this.operations.find(op => op.type === 'Number Operations')?.ops || [];
    } else if (categoryType === 'boolean') {
      this.opList[index] = this.operations.find(op => op.type === 'Boolean Operations')?.ops || [];
    } else {
      this.opList[index] = [];
    }
  }

  // Handle operation change from ExpressionComponent
  handleOperationChange(event: any, index: number) {
    const value = event.value;
    console.log('Operation changed:', value);
    this.expressions[index].operation = value;
  }

  // Handle type change from ExpressionComponent
  handleTypeChange(event: any, index: number) {
    const value = event.value;
    console.log('Type changed:', value);
    this.expressions[index].isFact = value === 'fact';
  }

  // Handle relation change from ExpressionComponent
  handleRelationChange(event: any, index: number) {
    const value = event.value;
    console.log('Relation changed:', value);
    this.expressions[index].relation = value;
  }

  // Add a new form section
  totalComp: number = 0;
  createComponent(relation: string) {
    this.expressions.push({ category: '', operation: '', value: '', isFact: false, relation: relation });
    this.opList.push([]); // Ensure opList has an entry for the new section
    this.totalComp = this.totalComp + 1;
  }

  // Submit form data
  onDone() {
    console.log(JSON.stringify(this.expressions, null, 2));
  }
}
