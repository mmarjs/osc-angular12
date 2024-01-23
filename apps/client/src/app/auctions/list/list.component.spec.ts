// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { IconsModule } from '@ocean/icons';
import { LocalizationService } from '@ocean/internationalization';
import {
  BasicLayoutModule,
  LayoutComponentsModule,
  OneColumnComponent,
} from '@ocean/layout';
import { mockEnvironment } from '@ocean/testing';
import { TestMatModule, TestModule } from '@ocean/testing/helpers/test.module';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { Observable } from 'rxjs';
import { AuctionsListComponent } from './list.component';
import { AuctionsListTableComponent } from './table';
import { NotifierService } from '@ocean/shared/services';

describe('AuctionsListComponent', () => {
  let component: AuctionsListComponent;
  let fixture: ComponentFixture<AuctionsListComponent>;
  let actions: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TestMatModule,
        TestModule,
        MockModule(BasicLayoutModule),
        MockModule(LayoutComponentsModule),
        MockModule(IconsModule),
        MatIconModule,
      ],
      declarations: [
        MockComponent(OneColumnComponent),
        MockComponent(AuctionsListTableComponent),
        AuctionsListComponent,
      ],
      providers: [
        MockProvider(LocalizationService),
        MockProvider(NotifierService, {error: jest.fn()}),
        provideMockStore({}),
        provideMockActions(() => actions),
        { provide: API_ENVIRONMENT, useValue: mockEnvironment },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
