import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from './components/header/header.component';
import { AppShowDirective } from './services/app-show.directive';
import { FormatPipe } from './services/format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UsersPageComponent,
    HeaderComponent,
    AppShowDirective,
    FormatPipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
