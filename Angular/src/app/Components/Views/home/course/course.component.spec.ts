import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseComponent} from './course.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
