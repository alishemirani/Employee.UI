import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { EmployeeAware } from '../models/employeeAware';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-create.component.sass']
})
export class EmployeeCreateComponent implements OnInit, EmployeeAware {

  pageTitle = 'Create Employee';
  errorMessage: string;
  isEditMode = false
  dateOfBirth: any
  dateOfHire: any
  currentEmployee: Employee;

  get Employee(): Employee {
    return this.currentEmployee;
  }
  set Employee(value: Employee) {
    this.currentEmployee = value;
  }

  constructor(private employeeService: EmployeeService,
    private router: Router) {
      this.currentEmployee = new Employee();
    }

  get isDirty(): boolean {
    return JSON.stringify(this.currentEmployee) !== "{\"address\":{}}"
  };

  ngOnInit(): void {
  }

  private getDate(date: any): Date {
    if (date && date.year && date.month && date.day) {
      return new Date(date.year, date.month, date.day)
    }
    return null
  }

  saveEmployee(): void {
    if (this.isValid()) {
      this.Employee.dateOfBirth = this.getDate(this.dateOfBirth);
      this.Employee.dateOfHire = this.getDate(this.dateOfHire);
      this.employeeService.createEmployee(this.Employee).subscribe({
        next: () => this.onSaveComplete(`The updated ${this.Employee.name} was saved`),
        error: err => {
          let errorMessage = '';
          let count: number = 1;
          for (let error in err.errors) {
            errorMessage += `${count}.${error}: ${err.errors[error]}\r\n`
          }
          this.errorMessage = errorMessage;
        }
      });
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  isValid(): boolean {
    return true;
  }

  deleteEmployee() {

  }

  onSaveComplete(message?: string): void {
    this.currentEmployee = new Employee();
    // Navigate back to the Employee list
    this.router.navigate(['/employees']);
  }

}
