import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { UserFacade } from '../../../../../../../libs/api/src/lib/state/user/facade';
import { ProfileServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let component: ProfileServicesComponent;
  let fixture: ComponentFixture<ProfileServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProfileServicesComponent],
      providers: [
        MockProvider(UserFacade, {
          userType$: of(),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
