import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuComponent} from './side-menu.component';
import {CurrentUserService} from '../../../../Services/Users/CurrentUser/current-user.service';
import {AuthenticationService} from '../../../../Services/Authentication/Authentication/authentication.service';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let getCurrentUserSpy, authSpy, nameEl, img;
  let test_user_creds = {
    email: 'test@test.test',
    password: 'N0Gu3$$es?'
  };

  beforeEach(async(() => {
    const authService = jasmine.createSpyObj('AuthenticationService', ['login']);
    authService.login(test_user_creds.email, test_user_creds.password);
    const currentUserService = jasmine.createSpyObj('CurrentUserService', ['getCurrentUser']);
    getCurrentUserSpy = currentUserService.getCurrentUser();


    TestBed.configureTestingModule({
      declarations: [ SideMenuComponent ],
      providers: [
        { provide: CurrentUserService, useValue: currentUserService }
      ]
    })
    .compileComponents();

    nameEl = fixture.nativeElement.querySelector('.name');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have correct user data for current user', () => {
    expect(getCurrentUserSpy.calls.count()).toBe(1, 'Current User should be queried exactly once!');
    expect(nameEl.textContent).toBe('test-nick');
  });
});
