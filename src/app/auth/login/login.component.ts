import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// Helpers
import { login } from 'src/app/shared/requrl';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): any {
    if (!this.loginForm.valid) {
      this.validationService.validateAllFormFields(this.loginForm);
      return false;
    }

    this.httpService.postData(login, this.loginForm.value).subscribe(({ token }) => {
      if (token) {
        this.setCookie('token', token);
        this.router.navigate([this.CONSTANTS.navigateToDashboard]);
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.showErrorToastr(error.message);
    });
  }

}
