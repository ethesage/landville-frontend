import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { routerSpy } from 'src/app/helpers/spies';
import { AuthService } from 'src/app/services/auth/auth.service';


describe('NoAuthGuard', () => {
  let authGuard: NoAuthGuard;
  let MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ NoAuthGuard,
        { provide: { AuthService, useValue: MockAuthService } },
      ]
    });
    MockAuthService = jasmine.createSpyObj([ 'isLoggedIn' ]);
    authGuard = new NoAuthGuard(MockAuthService, routerSpy);
  });

  it(
    'should setup the guard correctly',
    inject([ NoAuthGuard ], (guard: NoAuthGuard) => {
      expect(guard).toBeTruthy();
    })
  );

  it('should return false for a logged in user', () => {
    MockAuthService.isLoggedIn.and.returnValue(true);
    expect(authGuard.canActivate()).toEqual(false);
  });

  it('should return true for a loggedout users', () => {
    MockAuthService.isLoggedIn.and.returnValue(false);
    expect(authGuard.canActivate()).toEqual(true);
  });
});
