import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { LocalizationService } from '@ocean/internationalization';
import {
  TestMatModule,
  TestModule,
  TestStoreEnvModule,
} from '@ocean/testing/helpers/test.module';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { AccountSwitchComponent } from './account-switch.component';

class UserTestFacade {
  switchAccount(type: string) {
    return of(true);
  }
}

describe('AccountSwitchComponent', () => {
  let component: AccountSwitchComponent;
  let fixture: ComponentFixture<AccountSwitchComponent>;
  let userFacade = new UserTestFacade();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestStoreEnvModule,
        TestModule,
        TestMatModule,
        RouterTestingModule,
      ],
      declarations: [AccountSwitchComponent],
      providers: [
        MockProvider(LocalizationService),
        { provide: UserFacade, useValue: userFacade },
      ],
    })
      .overrideTemplate(AccountSwitchComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check doSwitchAccount', () => {
    let type = UserTypeTitles.BOAT_OWNER;
    it('doSwitchAccount', () => {
      const router = TestBed.inject(Router);
      jest.spyOn(router, 'navigate').mockImplementation();
      const spy = jest.spyOn(userFacade, 'switchAccount');

      component.doSwitchAccount(type);

      expect(spy).toBeCalledWith(type);
      expect(router.navigate).toHaveBeenCalledWith([
        '/dashboard/profile/services',
      ]);
    });
  });
});
