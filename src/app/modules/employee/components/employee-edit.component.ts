import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeWithId, EmployeeResolved, Employee } from '../models/employee';
import { EmployeeService } from '../service/employee.service';
import { EmployeeAware } from '../models/employeeAware';
import { stringify } from 'querystring';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.sass']
})
export class EmployeeEditComponent implements OnInit, EmployeeAware {

  pageTitle = 'Employee Edit';
  currentEmployee: EmployeeWithId;
  private originalEmployee: EmployeeWithId;
  errorMessage: string;
  isEditMode = true
  dateOfBirth: any
  dateOfHire: any

  get isDirty(): boolean {
    return JSON.stringify(this.originalEmployee) !== JSON.stringify(this.currentEmployee);
  }

  get Employee(): EmployeeWithId {
    return this.currentEmployee;
  }
  set Employee(value: EmployeeWithId) {
    this.currentEmployee = value;
    // Clone the object to retain a copy
    this.originalEmployee = { ...value };
  }

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: EmployeeResolved = data['data'];
      this.errorMessage = resolvedData.error;
      this.onEmployeeRetrieved(resolvedData.employee);
    });
  }

  onEmployeeRetrieved(Employee: EmployeeWithId): void {
    this.Employee = Employee;
    if (Employee.dateOfBirth) {
      const d = new Date(Employee.dateOfBirth)
      this.dateOfBirth = {
        year: d.getFullYear(),
        month: d.getMonth()+1,
        day: d.getDate()
      }
    }
    if (Employee.dateOfHire) {
      const d = new Date(Employee.dateOfHire)
      this.dateOfHire = {
        year: d.getFullYear(),
        month: d.getMonth()+1,
        day: d.getDate()
      }
    }

    if (!this.Employee) {
      this.pageTitle = 'No Employee found';
    } else {
      this.pageTitle = `Edit Employee: ${this.Employee.name}`;
    }
  }

  deleteEmployee(): void {
    if (confirm(`Really delete the Employee: ${this.Employee.name}?`)) {
      this.employeeService.deleteEmployee(this.Employee.id).subscribe({
        next: () => this.onSaveComplete(`${this.Employee.name} was deleted`),
        error: err => {
          let errorMessage = '';
          let count: number = 1;
          for (let error in err.errors) {
            errorMessage += `${count}.${error}: ${err.errors[error]}\r\n`
          }
          this.errorMessage = errorMessage;
        }
      });
    }
  }

  isValid(): boolean {
    return true;
  }

  reset(): void {
    this.currentEmployee = null;
    this.originalEmployee = null;
  }

  private getDate(dateObj) {
    if (dateObj && dateObj.year && dateObj.month && dateObj.day) {
      return new Date(dateObj.year, dateObj.month, dateObj.day)
    }
    return null;
  }


  saveEmployee(): void {
    if (this.isValid()) {
      let employee = new Employee();
      Object.assign(employee, this.Employee)
      employee.dateOfBirth = this.getDate(this.dateOfBirth);
      employee.dateOfHire = this.getDate(this.dateOfHire);
      this.employeeService.updateEmployee(this.Employee.id, employee).subscribe({
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

  onSaveComplete(message?: string): void {
    this.reset();

    // Navigate back to the Employee list
    this.router.navigate(['/employees']);
  }

}
