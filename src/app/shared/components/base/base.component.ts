// Core
import { Title } from '@angular/platform-browser';
import { Component, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 3rd Party Libraries
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';

// Helpers
import { HttpService } from 'src/app/shared/services/http.service';
import { CONSTANTS } from 'src/app/shared/services/constant.service';
import { ValidationService } from 'src/app/shared/services/validator.service';

@Component({
    template: ''
})
export class BaseComponent {
    protected title: Title;
    protected router: Router;
    public CONSTANTS = CONSTANTS;
    protected toastr: ToastrService;
    protected httpService: HttpService;
    protected spinner: NgxSpinnerService;
    protected cookieService: CookieService;
    protected activatedRoute: ActivatedRoute;
    protected validationService: ValidationService;

    constructor(injector: Injector) {
        this.router = injector.get(Router);
        this.toastr = injector.get(ToastrService);
        this.httpService = injector.get(HttpService);
        this.spinner = injector.get(NgxSpinnerService);
        this.cookieService = injector.get(CookieService);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.validationService = injector.get(ValidationService);
    }

    setCookie(key: string, value: string): void {
        return this.cookieService.put(key, value);
    }

    getCookie(key: string): string {
        return this.cookieService.get(key);
    }

    removeCookie(key: string): void {
        return this.cookieService.remove(key);
    }

    clearCookie(): void {
        return this.cookieService.removeAll();
    }

    logout(): void {
        this.removeCookie('token');
        this.router.navigate([this.CONSTANTS.navigateToLogin]);
    }

    scrollTo(el: Element): void {
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scrollToError(formId): void {
        const container = document.querySelector(`#${formId}`);
        const firstElementWithError = container.querySelector('.ng-invalid');
        this.scrollTo(firstElementWithError);
    }

    showErrorToastr(message: string): void {
        this.toastr.error(message);
    }

    showSuccessToastr(message: string): void {
        this.toastr.success(message);
    }

    goToHome(): void | Promise<boolean> {
        const token = this.getCookie('token');
        if (token) {
            return this.router.navigate(['/']);
        }
        return this.logout();
    }

}
