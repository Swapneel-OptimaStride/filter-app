import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonDirective, ButtonGroupComponent, FormCheckInputDirective, FormCheckLabelDirective, FormModule, GridModule, ModalModule, PopoverModule, TooltipModule } from '@coreui/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalModule, GridModule, PopoverModule, TooltipModule, CommonModule, FormsModule,ButtonGroupComponent,ButtonDirective,FormCheckLabelDirective,ReactiveFormsModule,FormCheckInputDirective,FormModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  title = 'filter-app';
  categories: any[] = [];
  formSections: any[] = [{ category: '', operation: '', value: '', flag: false }];
  OperationsList: any = [];
  enteredValue: string = '';
  selectedOperationType: string = '';

  operations = [
    { type: 'Number Operations', ops: ["=", ">", "<", "<=", ">=", "!="] },
    { type: 'String Operations', ops: ["startsWith", "endsWith", "contains", "hasLengthmorethan", "hasLengthlessthan", "hasLengthequalto", "hasLengthinbetween", "hasLengthnotinbetween", "hasLengthnotequal"] },
    { type: 'Boolean Operations', ops: ["=", "!="] }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch categories when the component initializes
    this.http.get<any[]>('http://localhost:3003/table').subscribe(
      (fields) => {
        this.categories = fields;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  flag : boolean = false;

  // Add a new form section when the 'New' button is clicked
  createComponent() {
    this.flag = true
    this.formSections.push({ category: '', operation: '', value: '', flag: this.flag });
  }

  // Handle dropdown change (category selection)
  onSelectChange(event: any, index: number) {
    let type = event.target.value;
    const selectedGroup = this.operations.find(group => group.type === `${type} Operations`);
    
    if (selectedGroup) {
      this.OperationsList = selectedGroup.ops;
      this.selectedOperationType = type;
    } else {
      this.OperationsList = [];
    }
  }

  // Handle "Done" button click
  onDone() {
    const selectedValues = {
      operationType: this.selectedOperationType,
      enteredValue: this.enteredValue
    };
    console.log(JSON.stringify(selectedValues, null, 2));
  }

  // Handle operation selection for each form section
  selectOperation(event: any, index: number) {
    console.log(event.target.value);
    this.formSections[index].operation = event.target.value;
  }

  vcr = inject(ViewContainerRef);
}
