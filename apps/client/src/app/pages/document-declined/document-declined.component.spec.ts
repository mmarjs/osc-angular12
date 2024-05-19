import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { UserFacade } from '@ocean/api/state';
import { UserTypeTitles } from '@ocean/api/shared';
import { of } from 'rxjs';
import { CustomBroadcastChannel } from '@ocean/shared';
import { DocumentDeclinedComponent } from './document-declined.component';

const mockUserFacade = {
  userType$: of(UserTypeTitles.SHIPYARD),
};

const mockBroadcastChannel = {
  only: () => of(UserTypeTitles.SURVEYOR),
};

describe('DocumentDeclinedComponent', () => {
  let component: DocumentDeclinedComponent;
  let fixture: ComponentFixture<DocumentDeclinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: CustomBroadcastChannel, useValue: mockBroadcastChannel },
      ],
      declarations: [
        DocumentDeclinedComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDeclinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
