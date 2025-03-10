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
    ExpressionComponent,
  
  ]
})
export class FilterComponent implements OnInit {
  facts: any[] = [];  
  opList: any[] = [];  
  expressions: Expression[] = [
    {
      logicalOperator: '',
      fact: '',
      operator: '',
      typeOfValue: '',
      value: '',
      sequenceNo: 0
    }
  ];  // Form sections array
  

//   export interface Expression {
//     logicalOperator: "and"| "or" | "";
//     fact: String;
//     operator: String;
//     typeOfValue: "fact" | "value" | "formula";
//     value: String;
//     sequenceNo: number;
// }
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
    this.expressions[index].fact = value;
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
    this.expressions[index].operator = value;
  }

  // Handle type change from ExpressionComponent
  handleTypeChange(event: any, index: number) {
    const value = event.value;
    console.log('Type changed:', value);
    this.expressions[index].typeOfValue = value;
  }

  // Handle relation change from ExpressionComponent
  handleRelationChange(event: any, index: number) {
    const value = event.value;
    console.log('Relation changed:', value);
    this.expressions[index].logicalOperator = value;
  }

  // Handle delete section from ExpressionComponent
  handleDeleteSection(index: number) {
    this.expressions.splice(index, 1);
    this.opList.splice(index, 1);
    // Reassign sequence numbers for expressions below the deleted one
    for (let i = index; i < this.expressions.length; i++) {
      this.expressions[i].sequenceNo -= 1;
    }
    console.log(this.expressions);
  }

  // Add a new form section
  totalComp: number = 0;
  createComponent(relation: '' | 'and' | 'or') {
    this.expressions.push({ logicalOperator: relation,
      fact: '',
      operator: '',
      typeOfValue: '',
      value: '',
      sequenceNo: this.expressions.length});
    this.opList.push([]); // Ensure opList has an entry for the new section
    this.totalComp = this.totalComp + 1;
    console.log('Total components:', this.totalComp);
    console.log(this.expressions);
  }

  // Submit form data
  onDone() {
    console.log(JSON.stringify(this.expressions, null, 2));
  }
}
