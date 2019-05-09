import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseMessagesComponent} from './course-messages.component';

describe('CourseMessagesComponent', () => {
  let component: CourseMessagesComponent;
  let fixture: ComponentFixture<CourseMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
