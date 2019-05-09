import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FancyInputComponent} from './fancy-input.component';
import {FormsModule} from '@angular/forms';

describe('FancyInputComponent', () => {
  let component: FancyInputComponent;
  let fixture: ComponentFixture<FancyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FancyInputComponent],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
