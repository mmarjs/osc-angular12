// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '@ocean/api/shared';
import { PanelWrapperComponent } from '@ocean/layout';
import { LinkDirectiveMock } from '@ocean/shared';
import { StoreTesting } from '@ocean/testing';
import { MockComponent } from 'ng-mocks';
import { ProfileWidgetComponent } from './widget.component';

describe('ProfileWidgetComponent', () => {
  let component: ProfileWidgetComponent;
  let fixture: ComponentFixture<ProfileWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MockComponent(PanelWrapperComponent),
        ProfileWidgetComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWidgetComponent);
    component = fixture.componentInstance;
    component.user = {
      firstName: 'Robert'
    } as User;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
