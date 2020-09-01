import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list.component';
import { EmployeeResolver } from './service/employee-resolver.service';
import { EmployeeEditComponent } from './components/employee-edit.component';
import { EmployeeCreateComponent } from './components/employee-create.component';
import { EmployeeGuard } from './components/employee.guard';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';


const routes: Routes = [{
  path: 'employees',
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: EmployeeListComponent
    },
    {
      path: 'new',
      component: EmployeeCreateComponent,
      canDeactivate: [EmployeeGuard]
    },
    {
      path: ':id/edit',
      component: EmployeeEditComponent,
      canDeactivate: [EmployeeGuard],
      resolve: { data: EmployeeResolver },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
