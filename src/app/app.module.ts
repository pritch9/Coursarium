import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './Components/splash/splash.component';
import { AdminComponent } from './Components/admin/admin.component';
import { SchoolFinderComponent } from './Components/school-finder/school-finder.component';
import { ErrorComponent } from './Components/error/error.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { FancyInputComponent } from './Components/fancy-input/fancy-input.component';
import { ComponentTestComponent } from './Components/component-test/component-test.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    AdminComponent,
    SchoolFinderComponent,
    ErrorComponent,
    RegisterComponent,
    FancyInputComponent,
    ComponentTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClickOutsideModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
