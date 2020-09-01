import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeAware } from '../models/employeeAware';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanDeactivate<EmployeeAware>  {

  canDeactivate(component: EmployeeAware,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const employeeName = component.currentEmployee.name || 'New Emplyee';
      return confirm(`Navigate away and lose all changes to ${employeeName}?`);
    }
    return true;
  }

}
