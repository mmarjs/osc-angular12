import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponentsImports } from '../components.imports';
import { TwoColumnsComponent } from './two-columns.component';

describe('TwoColumnsComponent', () => {
  let component: TwoColumnsComponent;
  let fixture: ComponentFixture<TwoColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: LayoutComponentsImports,
      declarations: [TwoColumnsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
