import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { AppFormsImports } from '../forms.imports';
import { FormLocationComponent } from '../location';
import { FormOwnerComponent } from './owner.component';

describe('FormOwnerComponent', () => {
  let component: FormOwnerComponent;
  let fixture: ComponentFixture<FormOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...AppFormsImports],
      declarations: [MockComponent(FormLocationComponent), FormOwnerComponent]
    }).overrideTemplate(FormOwnerComponent, '').compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on ngOnInit', () => {
    it('initForm to be called', () => {
      const spy = jest.spyOn(component, 'initForm')
      component.ngOnInit()
      expect(spy).toBeCalled()
    })
  })

  describe('on initForm', () => {
    it('checking form value', () => {
      let form = new FormGroup({
        name: new FormControl(''),
        makeModelYear: new FormControl(''),
        address: new FormControl(''),
        address2: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl('FL'),
        zipCode: new FormControl(''),
        about: new FormControl('')
      })
      component.form = form;
      component.initForm()
      expect(component.form.value).toEqual(form.value)
    })
  })

});
