import { Address } from "./address";

export class Employee {
  constructor() {
    this.address = new Address()
  }
  name: string;
  address: Address;
  role: string;
  department: string;
  skillSets: string;
  dateOfBirth: Date;
  dateOfHire: Date;
  isActive: boolean;
}

export class EmployeeWithId extends Employee {
  id: string;
}

export class EmployeeResolved {
  employee: EmployeeWithId;
  error?: any;
}
