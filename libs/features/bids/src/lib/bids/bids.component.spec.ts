import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedBidsComponentsModule } from '@ocean/client/common/components/shared-bids-components/shared-bids-components.module';

import { BidsComponent } from './bids.component';
import { Observable } from 'rxjs';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BidDialogs } from '@ocean/api/data';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppComponentsModule } from '@ocean/client/common/components/components.module';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedModule } from '@ocean/shared';

xdescribe('BidsComponent', () => {
  let component: BidsComponent;
  let fixture: ComponentFixture<BidsComponent>;
  let actions: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MockModule(SharedBidsComponentsModule),
        MockModule(AppComponentsModule),
        MockModule(SharedModule),
      ],
      declarations: [BidsComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions),
        MockProvider(BidDialogs),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
