// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PanelWrapperComponent } from '@ocean/layout';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { UserFacade } from '../../../../../../../libs/api/src/lib/state/user/facade';
import { ProfileFormComponent } from './form.component';
import { TextFieldComponent } from '../../../../../../../libs/shared/src/lib/forms/fields/text/text.component';
import { EmailFieldComponent } from '../../../../../../../libs/shared/src/lib/forms/fields/email/email.component';
import { LocalizationService } from '@ocean/internationalization';
import { MatInputModule } from '@angular/material/input';
import { NumberOnlyDirective, TrimInputDirective } from '@ocean/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ...StoreTesting,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [
        ProfileFormComponent,
        TextFieldComponent,
        EmailFieldComponent,
        MockComponent(PanelWrapperComponent),
        MockPipe(TranslatePipe, (value: string) => value),
        TrimInputDirective,
        NumberOnlyDirective
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({}),
          },
        },
        MockProvider(TranslateService),
        MockProvider(UserFacade, {
          user$: of(),
        }),
        MockProvider(LocalizationService),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
