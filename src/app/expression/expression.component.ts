import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, GridModule } from '@coreui/angular';

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss'],
  standalone: true,
  imports: [CommonModule, GridModule, FormsModule,ButtonModule],
})
export class ExpressionComponent implements OnInit {
  @Input() categories: any[] = [];
  @Input() opList: any = [];
  @Input() section: any = [];
  @Input() index!: number;
  @Input() operators : any[] = [];
  @Input() facts: any[] = [];
  @Input() expression: any[] = [];

  @Output() onCategoryChange = new EventEmitter<any>();
  @Output() onOperationChange = new EventEmitter<any>();
  @Output() onTypeChange = new EventEmitter<any>();
  @Output() onRelationChange = new EventEmitter<any>();
  @Output() onDeleteSection = new EventEmitter<number>();

  formSections: any[] = []; // Example initialization, adjust as needed
  valueOptions: any[] = []; // Example initialization, adjust as needed

  ngOnInit(): void {
    // console.log(this.categories, "Setting Values here");
    // console.log(this.index, "Index");
    // console.log(this.opList, "Operation List");
    console.log(" hey",this.facts);
    console.log(this.expression);
  }

  // Method to handle category change
  onCategoryChangeHandler(event: any) {
    this.onCategoryChange.emit({ value: event.target.value, index: this.index });
  }

  // Method to handle operation change
  onOperationChangeHandler(event: any) {
    this.onOperationChange.emit({ value: event.target.value, index: this.index });
  }

  // Method to handle type change
  onTypeChangeHandler(event: any) {
    const selectedType = event.target.value;
    this.onTypeChange.emit({ value: selectedType, index: this.index });
    if (selectedType === 'fact') {
      const categoryType = this.categories.find(cat => cat.name === this.section.category)?.type;
      this.valueOptions = this.categories.filter(cat => cat.type === categoryType && cat.name !== this.section.category);
    } else {
      this.valueOptions = [];
    }
  }

  // Method to handle relation change
  onRelationChangeHandler(event: any) {
    this.onRelationChange.emit({ value: event.target.value, index: this.index });
  }

  // Method to handle delete section
  onDeleteSectionHandler() {
    this.onDeleteSection.emit(this.index);
  }

  onCategorychange(event:any)
  {
    // console.log("Category Changed",this.operators," ",event.target.value);
    // console.log("Category Changed",this.operators);
    // console.log(this.facts);
    const categoryType = this.facts.find(cat => cat.name === event.target.value)?.type;
    // console.log(categoryType);
    if (categoryType === 'String') {
      this.opList = this.operators.find(op => op.type === 'String Operations')?.ops || [];
    } else if (categoryType === 'Number') {
      this.opList = this.operators.find(op => op.type === 'Number Operations')?.ops || [];
    } else if (categoryType === 'Boolean') {
      this.opList = this.operators.find(op => op.type === 'Boolean Operations')?.ops || [];
    }
    // console.log(this.opList);



  }
}
