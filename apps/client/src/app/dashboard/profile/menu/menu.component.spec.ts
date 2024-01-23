// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterFacade } from '@ocean/client/state';
import { PanelWrapperComponent } from '@ocean/layout';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockProvider, MockPipe, MockModule } from 'ng-mocks';
import { DashboardImports } from '../../dashboard.imports';
import { ProfileMenuComponent } from './menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('ProfileMenuComponent', () => {
  let component: ProfileMenuComponent;
  let fixture: ComponentFixture<ProfileMenuComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MockModule(MatMenuModule),
        MatIconModule
      ],
      declarations: [
        MockComponent(PanelWrapperComponent),
        MockPipe(TranslatePipe, (value: string) => value),
        ProfileMenuComponent,
      ],
      providers: [MockProvider(RouterFacade, { url$: of('url') })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
