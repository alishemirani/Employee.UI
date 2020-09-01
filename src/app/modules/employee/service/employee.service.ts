import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployeeModule } from '../employee.module';
import { ApiService } from 'src/app/core/services/api.service';
import { EmployeeWithId, Employee } from '../models/employee';
import { ArrayResponse } from 'src/app/shared/models/array-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private basePath: string = '/employees';

  constructor(
    private apiService: ApiService
  ) {}

  getEmployee(id: string) {
    return this.apiService.get(this.basePath + '/' + id)
  }

  getEmployees() : Observable<ArrayResponse<EmployeeWithId>> {
    return this.apiService.get(this.basePath)
  }

  createEmployee(employee: Employee) : Observable<EmployeeWithId> {
    return this.apiService.post(this.basePath, employee)
  }

  updateEmployee(id: string, employee: Employee)  {
    return this.apiService.put(this.basePath + "/" + id, employee)
  }

  deleteEmployee(id: string)  {
    return this.apiService.delete(this.basePath + '/' + id)
  }
}
