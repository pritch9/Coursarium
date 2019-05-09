import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfAdminComponent} from './prof-admin.component';

describe('ProfAdminComponent', () => {
  let component: ProfAdminComponent;
  let fixture: ComponentFixture<ProfAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfAdminComponent ]
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
