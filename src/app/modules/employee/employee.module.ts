import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee.routes';
import { EmployeeListComponent } from './components/employee-list.component';
import { EmployeeCreateComponent } from './components/employee-create.component';
import { AddressComponent } from './components/address.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeEditComponent } from './components/employee-edit.component';
import { ConvertToDateTransform } from './pipes/date-convertor.pipe';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  declarations: [
    ConvertToDateTransform,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent,
    AddressComponent
  ]
})
export class EmployeeModule { }
