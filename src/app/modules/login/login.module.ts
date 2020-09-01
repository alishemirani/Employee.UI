import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
