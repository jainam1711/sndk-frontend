import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

// 3rd Party Libraries
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Helpers
import { BaseComponent } from '../components/base/base.component';

@Injectable()
export class HttpConfigInterceptor extends BaseComponent implements HttpInterceptor {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.spinner.hide();
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.showErrorToastr(this.CONSTANTS.unauthorized);
              this.logout();
              break;
            default:
              break;
          }
        }
        return throwError(err.error);
      })
    );
  }

}
