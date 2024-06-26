import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockPipe } from 'ng-mocks';
import { BasicImports } from '../basic.imports';
import { MenuOverlayComponent } from './menu-overlay.component';
import { translateServiceMock } from '@ocean/testing/mocks/translate-service-mock';

describe('MenuOverlayComponent', () => {
  let component: MenuOverlayComponent;
  let fixture: ComponentFixture<MenuOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...BasicImports, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MenuOverlayComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [
        provideMockStore(),
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
