import { Employee } from './employee';

export interface EmployeeAware {
  currentEmployee: Employee;
  isDirty: boolean;
}
