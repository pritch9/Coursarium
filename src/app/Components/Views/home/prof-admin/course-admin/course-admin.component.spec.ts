import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseAdminComponent} from './course-admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CourseAdminComponent', () => {
  let component: CourseAdminComponent;
  let fixture: ComponentFixture<CourseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseAdminComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularEditorModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
