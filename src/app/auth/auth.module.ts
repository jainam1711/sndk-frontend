import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AuthRoutingModule } from './auth-routing.module';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule { }
