import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

// Helpers
import { BaseComponent } from '../components/base/base.component';

@Injectable()
export class PageGuard extends BaseComponent implements CanActivate {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const token = this.getCookie('token');
    if (token) { return true; }
    this.goToHome();
    return false;
  }

}
