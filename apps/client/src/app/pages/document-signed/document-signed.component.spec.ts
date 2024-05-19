import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSignedComponent } from './document-signed.component';
import { MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { UserFacade } from '@ocean/api/state';
import { UserTypeTitles } from '@ocean/api/shared';
import { firstValueFrom, of } from 'rxjs';
import { CustomBroadcastChannel } from '@ocean/shared';

const mockUserFacade = {
  userType$: of(UserTypeTitles.SHIPYARD),
};

const mockBroadcastChannel = {
  only: () => of(UserTypeTitles.SURVEYOR),
};

describe('DocumentSignedComponent', () => {
  let component: DocumentSignedComponent;
  let fixture: ComponentFixture<DocumentSignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: UserFacade, useValue: mockUserFacade },
        { provide: CustomBroadcastChannel, useValue: mockBroadcastChannel },
      ],
      declarations: [
        DocumentSignedComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
