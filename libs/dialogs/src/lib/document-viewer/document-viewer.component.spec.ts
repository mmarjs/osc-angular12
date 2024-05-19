import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentViewerComponent } from './document-viewer.component';
import {
  TestModule,
  TestStoreEnvModule,
} from '@ocean/testing/helpers/test.module';
import { CustomBroadcastChannel } from '@ocean/shared';
import { UserFacade } from '@ocean/api/state';
import { UserTypeTitles } from '@ocean/api/shared';
import { of } from 'rxjs';

const mockBroadcastChannel = {
  send: () => undefined,
};

const mockUserFacade = {
  userType$: of(UserTypeTitles.SURVEYOR),
};

describe('DocumentViewerComponent', () => {
  let component: DocumentViewerComponent;
  let fixture: ComponentFixture<DocumentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStoreEnvModule, TestModule],
      declarations: [DocumentViewerComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CustomBroadcastChannel, useValue: mockBroadcastChannel },
        { provide: UserFacade, useValue: mockUserFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
