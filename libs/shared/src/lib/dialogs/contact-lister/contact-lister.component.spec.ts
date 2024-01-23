import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@ocean/shared';
import { DropDownComponent } from '@ocean/shared/forms/fields/drop-down';
import { MockComponent, MockModule } from 'ng-mocks';

import { ContactListerComponent } from './contact-lister.component';

describe('ContactListerComponent', () => {
  let component: ContactListerComponent;
  let fixture: ComponentFixture<ContactListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MockModule(MatIconModule),
        MockModule(MatFormFieldModule),
        MockModule(MatDialogModule),
        MockModule(SharedModule)
      ],
      declarations: [ContactListerComponent, MockComponent(DropDownComponent)],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
