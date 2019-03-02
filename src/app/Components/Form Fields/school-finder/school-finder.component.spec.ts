import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolFinderComponent } from './school-finder.component';

describe('SchoolFinderComponent', () => {
  let component: SchoolFinderComponent;
  let fixture: ComponentFixture<SchoolFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
