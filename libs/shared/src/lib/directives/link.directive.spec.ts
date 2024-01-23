import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkDirective, LinkHrefDirective } from './link.directive';

@Component({
  template: `
    <a [appLink]="linkRoute">Link</a>
    <a [appLink]="[linkRoute, linkParams]">Link</a>
    <button [appLink]="[linkRoute, linkParams]">Button</button>
  `
})
class TestHoverFocusComponent {
  linkParams = { id: 1 };
  linkRoute = 'SHIPYARDS_DISPLAY';
}

describe('Directive: HoverFocus', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TestHoverFocusComponent, LinkDirective, LinkHrefDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
