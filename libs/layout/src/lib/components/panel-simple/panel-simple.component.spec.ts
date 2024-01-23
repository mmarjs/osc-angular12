import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponentsImports } from '../components.imports';
import { PanelSimpleComponent } from './panel-simple.component';

describe('PanelSimpleComponent', () => {
  let component: PanelSimpleComponent;
  let fixture: ComponentFixture<PanelSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [...LayoutComponentsImports],
      declarations: [PanelSimpleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
