import { Component, OnInit } from '@angular/core';
import { EmployeeWithId } from '../models/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {

  pageTitle = 'Employee List';
  employees: EmployeeWithId[] = [];
  errorMessage: '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: employess => {
        this.employees = employess.data
      },
      error: err => this.errorMessage = err
    })
  }

}
