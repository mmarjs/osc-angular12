import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { BasicImports } from '../basic.imports';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { BasicLayout } from './body.component';

describe('BasicLayout', () => {
  let component: BasicLayout;
  let fixture: ComponentFixture<BasicLayout>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...BasicImports],
      declarations: [
        MockComponent(HeaderComponent),
        MockComponent(FooterComponent),
        BasicLayout
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
