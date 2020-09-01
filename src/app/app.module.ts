import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeModule } from './modules/employee/employee.module';
import { LoginModule } from './modules/login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    EmployeeModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
