import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockPipe } from 'ng-mocks';
import { BasicImports } from '../basic.imports';
import { MenuComponent } from './menu.component';
import { IconsModule } from '@ocean/icons';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';

describe('LayoutBasicMenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ...BasicImports,
        ...StoreTesting,
        IconsModule,
      ],
      declarations: [
        LinkDirectiveMock,
        MenuComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        provideMockStore(),
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
