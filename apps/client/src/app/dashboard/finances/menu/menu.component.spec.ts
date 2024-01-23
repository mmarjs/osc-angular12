// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterFacade } from '@ocean/client/state';
import { PanelWrapperComponent } from '@ocean/layout';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { DashboardImports } from '../../dashboard.imports';
import { FinancesMenuComponent } from './menu.component';

describe('FinancesMenuComponent', () => {
  let component: FinancesMenuComponent;
  let fixture: ComponentFixture<FinancesMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting, MatIconModule, MatListModule],
      declarations: [
        MockComponent(PanelWrapperComponent),
        MockPipe(TranslatePipe, (value: string) => value),
        FinancesMenuComponent,
      ],
      providers: [RouterFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
