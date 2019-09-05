import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routerSpy } from 'src/app/helpers/tests/spies';


describe('AuthGuard', () => {
  let MockAuthService;
  let guard;
  beforeEach(() => {
    MockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LocalStorageService,
        { provide: { AuthService, useValue: MockAuthService } },
      ]
    });
    guard = new AuthGuard(MockAuthService, routerSpy);
  });

  it(
    'should setup the guard correctly',
    inject([AuthGuard], (guard: AuthGuard) => {
      expect(guard).toBeTruthy();
    })
  );

  it('should activate', () => {
    const next = {
      url: '/'
    };
    const state = null;
    MockAuthService.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate(next, state)).toBeTruthy();
  });

  it('should not activate', () => {
    const next = {
      url: '/'
    };
    const state = null;
    MockAuthService.isLoggedIn.and.returnValue(false);
    expect(guard.canActivate(next, state)).toBeFalsy();
  });
});
