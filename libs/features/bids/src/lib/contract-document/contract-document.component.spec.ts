import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';

import { ContractDocumentComponent } from './contract-document.component';

describe('ContractDocumentComponent', () => {
  let component: ContractDocumentComponent;
  let fixture: ComponentFixture<ContractDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStoreEnvModule, TestModule, MatDialogModule, MatSnackBarModule],
      declarations: [ ContractDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
