import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MenuComponentComponent } from './menu-component.component';
import { IconsModule } from '@ocean/icons';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';
import { MockPipe } from 'ng-mocks';

describe('MenuComponentComponent', () => {
  let component: MenuComponentComponent;
  let fixture: ComponentFixture<MenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule],
      declarations: [MenuComponentComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [
        provideMockStore({}),
        { provide: TranslateService, useValue: translateServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
