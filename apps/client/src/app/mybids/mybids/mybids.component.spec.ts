import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedBidsComponentsModule } from '@ocean/client/common/components/shared-bids-components/shared-bids-components.module';
import { LocalizationService } from '@ocean/internationalization';
import { SearchFilterComponent } from '@ocean/shared';
import { DropDownComponent } from '@ocean/shared/forms/fields/drop-down';
import { MockComponent, MockModule, MockPipe, MockProvider } from 'ng-mocks';

import { MybidsComponent } from './mybids.component';

describe('MybidsComponent', () => {
  let component: MybidsComponent;
  let fixture: ComponentFixture<MybidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MockModule(SharedBidsComponentsModule),
      ],
      declarations: [
        MybidsComponent,
        // MockComponent(BidsTableComponent),
        MockComponent(DropDownComponent),
        MockComponent(SearchFilterComponent),
        MockPipe(TranslatePipe, (value) => value),
      ],
      providers: [provideMockStore(), MockProvider(LocalizationService)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MybidsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
