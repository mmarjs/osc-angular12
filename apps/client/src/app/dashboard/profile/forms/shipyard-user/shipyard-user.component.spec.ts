import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizationService } from '@ocean/internationalization';
import { SharedModule } from '@ocean/shared';
import { TestModule, TestMatModule } from '@ocean/testing/helpers/test.module';
import { MockModule, MockProvider } from 'ng-mocks';

import { ShipyardUserComponent } from './shipyard-user.component';

describe('ShipyardSignupComponent', () => {
  let component: ShipyardUserComponent;
  let fixture: ComponentFixture<ShipyardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        TestModule,
        MockModule(SharedModule),
        TestMatModule,
        BrowserAnimationsModule
      ],
      declarations: [ ShipyardUserComponent ],
      providers: [MockProvider(LocalizationService)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipyardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
