import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListerDialogComponent } from './contact-lister-dialog.component';

describe('ContactListerDialogComponent', () => {
  let component: ContactListerDialogComponent;
  let fixture: ComponentFixture<ContactListerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactListerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
