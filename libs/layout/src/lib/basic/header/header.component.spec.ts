import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { BasicImports } from '../basic.imports';
import { MenuComponent } from '../menu';
import { NavtopComponent } from '../navtop';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...BasicImports, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MockComponent(MenuComponent),
        MockComponent(NavtopComponent),
        HeaderComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
