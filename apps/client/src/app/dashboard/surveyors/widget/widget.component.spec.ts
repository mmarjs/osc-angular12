// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { SurveyorsWidgetComponent } from './widget.component';

describe('SurveyorsWidgetComponent', () => {
  let component: SurveyorsWidgetComponent;
  let fixture: ComponentFixture<SurveyorsWidgetComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MockComponent(PanelWrapperComponent),
        MockPipe(TranslatePipe, (value: string) => value),
        SurveyorsWidgetComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyorsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
