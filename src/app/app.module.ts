import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3rd Party Libraries
import { CookieModule } from 'ngx-cookie';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';

// Guards
import { AuthGuard } from './shared/guards/auth-guard.service';
import { PageGuard } from './shared/guards/page-guard.service';

// Interceptor
import { HttpConfigInterceptor } from './shared/interceptor/httpconfig.interceptor';

// Modules
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    CookieModule.forRoot(),
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SharedModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      preventDuplicates: true,
      progressBar: true,
      timeOut: 2000,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    AuthGuard,
    PageGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
