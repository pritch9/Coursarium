import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './Components/Views/splash/splash.component';
import { AdminComponent } from './Components/Views/admin/admin.component';
import { ErrorComponent } from './Components/Views/error/error.component';
import { ComponentTestComponent } from './Components/component-test/component-test.component';
import { RegisterComponent } from './Components/Authentication/register/register.component';
import {DashboardComponent} from './Components/Views/home/dashboard/dashboard.component';
import {HomeComponent} from './Components/Views/home/home.component';
import {CoursesComponent} from './Components/Views/home/courses/courses.component';
import {AuthGuardService} from './Services/Authentication/AuthGuard/auth-guard.service';
import {CourseComponent} from './Components/Views/home/course/course.component';
import {CourseHomeComponent} from './Components/Views/home/course/course-home/course-home.component';
import {CourseSyllabusComponent} from './Components/Views/home/course/course-syllabus/course-syllabus.component';
import {CourseAssignmentsComponent} from './Components/Views/home/course/course-assignments/course-assignments.component';
import {CourseForumComponent} from './Components/Views/home/course/course-forum/course-forum.component';
import {CourseMessagesComponent} from './Components/Views/home/course/course-messages/course-messages.component';
import {E404Component} from './Components/Views/error/e404/e404.component';
import {ProfAdminComponent} from './Components/Views/home/prof-admin/prof-admin.component';
import {ResetPasswordComponent} from './Components/Views/reset-password/reset-password.component';
import {ResetPasswordGuardService} from './Services/Authentication/ResetPasswordGuard/reset-password-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'my-courses',
        component: CoursesComponent
      },
      {
        path: 'profadmin',
        redirectTo: 'profadmin/'
      },
      {
        path: 'profadmin/:courseid',
        component: ProfAdminComponent
      },
      {
        path: 'course/:id',
        component: CourseComponent,
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          },
          {
            path: 'home',
            component: CourseHomeComponent
          },
          {
            path: 'syllabus',
            component: CourseSyllabusComponent
          },
          {
            path: 'assignments',
            component: CourseAssignmentsComponent
          },
          {
            path: 'forum',
            component: CourseForumComponent
          },
          {
            path: 'messages',
            component: CourseMessagesComponent
          }
        ]
      }
    ]
  },
  {
    path: 'password-reset/:user_id/:hash',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordGuardService]
  },
  {
    path: 'welcome',
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
    path: 'error',
    component: ErrorComponent,
    children: [
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
      },
      {
        path: '404',
        component: E404Component
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
