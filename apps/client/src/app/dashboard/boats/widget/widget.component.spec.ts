// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { BoatsListComponent } from '../list';
import { BoatsWidgetComponent } from './widget.component';

describe('BoatsWidgetComponent', () => {
  let component: BoatsWidgetComponent;
  let fixture: ComponentFixture<BoatsWidgetComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MockComponent(PanelWrapperComponent),
        MockComponent(BoatsListComponent),
        BoatsWidgetComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
