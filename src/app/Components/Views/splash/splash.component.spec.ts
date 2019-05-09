import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SplashComponent} from './splash.component';
import {NavbarComponent} from '../../navbar/navbar.component';
import {SchoolFinderComponent} from '../../Form Fields/school-finder/school-finder.component';
import {LoginComponent} from '../../Authentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from '../../loading/loading.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SplashComponent,
        NavbarComponent,
        SchoolFinderComponent,
        LoginComponent,
        LoadingComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
