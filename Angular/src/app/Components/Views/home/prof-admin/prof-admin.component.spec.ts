import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfAdminComponent} from './prof-admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourseAdminComponent} from './course-admin/course-admin.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProfAdminComponent', () => {
  let component: ProfAdminComponent;
  let fixture: ComponentFixture<ProfAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfAdminComponent,
        CourseAdminComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularEditorModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
