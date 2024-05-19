import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsItemComponent } from './item.component';
import { IconsModule } from '@ocean/icons';
import { TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';
import { MatListModule } from '@angular/material/list';

describe('NotificationsItemComponent', () => {
  let component: NotificationsItemComponent;
  let fixture: ComponentFixture<NotificationsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, IconsModule],
      declarations: [NotificationsItemComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
