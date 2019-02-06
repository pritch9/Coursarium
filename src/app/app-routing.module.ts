import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './Components/splash/splash.component';
import {AdminComponent} from './Components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: SplashComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
