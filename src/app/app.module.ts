import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { PageModule } from './pages/page.module';

// Perfect Scroolbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
// -- End

import { AppComponent } from './app.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
//
import { fakeBackendProvider } from './helpers/fake-backend';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PageModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
  //
  fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
