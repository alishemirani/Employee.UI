import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeeResolved } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<EmployeeResolved> {

  constructor(private employeeService: EmployeeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): EmployeeResolved | import("rxjs").Observable<EmployeeResolved> | Promise<EmployeeResolved> {
    const id = route.paramMap.get('id');
    return this.employeeService.getEmployee(id)
      .pipe(
        map(emp => ({ employee: emp })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ employee: null, error: message });
        })
      );
  }

}
