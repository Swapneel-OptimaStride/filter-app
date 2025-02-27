import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@coreui/angular';

@Component({
  selector: 'app-expression',
  templateUrl: './expression.component.html',
  styleUrls: ['./expression.component.scss'],
  standalone: true,
  imports: [CommonModule, GridModule, FormsModule],
})
export class ExpressionComponent implements OnInit {
  @Input() categories: any[] = [];
  @Input() opList: any = [];
  @Input() section: any = [];
  @Input() index!: number;

  @Output() onCategoryChange = new EventEmitter<any>();
  @Output() onOperationChange = new EventEmitter<any>();
  @Output() onTypeChange = new EventEmitter<any>();

  formSections: any[] = []; // Example initialization, adjust as needed
  valueOptions: any[] = []; // Example initialization, adjust as needed

  ngOnInit(): void {
    // console.log(this.categories, "Setting Values here");
    // console.log(this.index, "Index");
    // console.log(this.opList, "Operation List");
  }

  // Method to handle category change
  onCategoryChangeHandler(event: any) {
    this.onCategoryChange.emit(event.target.value);
  }

  // Method to handle operation change
  onOperationChangeHandler(event: any) {
    this.onOperationChange.emit(event.target.value);
  }

  // Method to handle type change
  onTypeChangeHandler(event: any) {
    const selectedType = event.target.value;
    this.onTypeChange.emit(selectedType);
    if (selectedType === 'fact') {
      const categoryType = this.categories.find(cat => cat.name === this.section.category)?.type;
      this.valueOptions = this.categories.filter(cat => cat.type === categoryType && cat.name !== this.section.category);
    } else {
      this.valueOptions = [];
    }
  }
  onClick(){
    console.log(this.categories, "Setting Values here");
    console.log(this.index, "Index");
    console.log(this.opList, "Operation List");
  }
}
