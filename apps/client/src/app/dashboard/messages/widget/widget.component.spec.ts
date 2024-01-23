// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { MockComponent } from 'ng-mocks';
import { MessagesWidgetComponent } from './widget.component';

describe('MessagesWidgetComponent', () => {
  let component: MessagesWidgetComponent;
  let fixture: ComponentFixture<MessagesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        LinkDirectiveMock,
        MockComponent(PanelWrapperComponent),
        MessagesWidgetComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
