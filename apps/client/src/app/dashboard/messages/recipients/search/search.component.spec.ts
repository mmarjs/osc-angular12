import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesRecipientsSearchComponent } from './search.component';
import { IconsModule } from '@ocean/icons';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MessagesRecipientsSearchComponent', () => {
  let component: MessagesRecipientsSearchComponent;
  let fixture: ComponentFixture<MessagesRecipientsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        IconsModule,
      ],
      declarations: [MessagesRecipientsSearchComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesRecipientsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
