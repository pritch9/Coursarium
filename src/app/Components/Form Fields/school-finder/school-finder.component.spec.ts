import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SchoolFinderComponent} from './school-finder.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('SchoolFinderComponent', () => {
  let component: SchoolFinderComponent;
  let fixture: ComponentFixture<SchoolFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ SchoolFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
