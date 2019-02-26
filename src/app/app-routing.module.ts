import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './Components/splash/splash.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ErrorComponent } from './Components/error/error.component';
import { ComponentTestComponent } from './Components/component-test/component-test.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';

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
    path: 'register/:school',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
