import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponentsImports } from '../components.imports';
import { PanelWrapperComponent } from './panel-wrapper.component';

describe('PanelWrapperComponent', () => {
  let component: PanelWrapperComponent;
  let fixture: ComponentFixture<PanelWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...LayoutComponentsImports],
      declarations: [PanelWrapperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
