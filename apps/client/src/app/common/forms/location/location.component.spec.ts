import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StateAutocompleterComponent, TextFieldComponent } from '@ocean/shared';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockComponent } from 'ng-mocks';
import { AppFormsImports } from '../forms.imports';
import { FormLocationComponent } from './location.component';

describe('FormLocationComponent', () => {
  let component: FormLocationComponent;
  let fixture: ComponentFixture<FormLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...AppFormsImports, TestModule],
      declarations: [
        MockComponent(TextFieldComponent),
        MockComponent(StateAutocompleterComponent),
        FormLocationComponent,
      ],
    })
      .overrideTemplate(FormLocationComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    const builder = TestBed.get(FormBuilder);

    fixture = TestBed.createComponent(FormLocationComponent);
    component = fixture.componentInstance;
    component.form = builder.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check readonly', () => {
    it('should update readonly', fakeAsync(() => {
      const header = coerceBooleanProperty(true);
      component.readonly = header;
      tick();
      expect(component.readonly).toEqual(header);
    }));
  });

  describe('check getters', () => {
    it('check zipCodeCtrl,stateCtrl,cityCtrl', fakeAsync(() => {
      tick();
      expect(component.zipCodeCtrl).toEqual(component.form.get('zipCode'));
      expect(component.stateCtrl).toEqual(component.form.get('state'));
      expect(component.cityCtrl).toEqual(component.form.get('city'));
    }));
  });

  describe('on ngOnInit', () => {
    it('should call zipCodeCtrl.disable', () => {
      component._readonly = true;
      const spy = jest.spyOn(component.zipCodeCtrl, 'disable');
      component.ngOnInit();
      expect(spy).toBeCalled();
    });
  });
});
