import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './Components/Views/splash/splash.component';
import { AdminComponent } from './Components/Views/admin/admin.component';
import { ErrorComponent } from './Components/Views/error/error.component';
import { ComponentTestComponent } from './Components/component-test/component-test.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import {DashboardComponent} from './Components/Views/home/dashboard/dashboard.component';
import {HomeComponent} from './Components/Views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: SplashComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'test',
    component: ComponentTestComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/:school',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
        {
          path: '',
          component: DashboardComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
