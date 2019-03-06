import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './Components/Views/splash/splash.component';
import { AdminComponent } from './Components/Views/admin/admin.component';
import { SchoolFinderComponent } from './Components/Form Fields/school-finder/school-finder.component';
import { ErrorComponent } from './Components/Views/error/error.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import { FancyInputComponent } from './Components/Form Fields/fancy-input/fancy-input.component';
import { ComponentTestComponent } from './Components/component-test/component-test.component';
import { ContactComponent } from './Components/Views/contact/contact.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { DashboardComponent } from './Components/Views/home/dashboard/dashboard.component';
import { HomeComponent } from './Components/Views/home/home.component';
import { SideMenuComponent } from './Components/Views/home/side-menu/side-menu.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { CoursesComponent } from './Components/Views/home/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    AdminComponent,
    SchoolFinderComponent,
    ErrorComponent,
    RegisterComponent,
    FancyInputComponent,
    ComponentTestComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    SideMenuComponent,
    LoadingComponent,
    CoursesComponent
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
