import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StateAutocompleterComponent, TextFieldComponent } from '@ocean/shared';
import { MockComponent, MockPipe } from 'ng-mocks';
import { AppFormsImports } from '../forms.imports';
import { FormAddressComponent } from './address.component';
import { TranslatePipe } from '@ngx-translate/core';

describe('FormAddressComponent', () => {
  let component: FormAddressComponent;
  let fixture: ComponentFixture<FormAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...AppFormsImports],
      declarations: [
        MockComponent(TextFieldComponent),
        MockComponent(StateAutocompleterComponent),
        FormAddressComponent,
        MockPipe(TranslatePipe, (v) => v),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const builder = TestBed.get(FormBuilder);

    fixture = TestBed.createComponent(FormAddressComponent);
    component = fixture.componentInstance;
    component.form = builder.group({
      address: ['', Validators.required],
      address2: ''
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check readonly', () => {
    it('should update readonly', fakeAsync( ()=>{
      const header = coerceBooleanProperty(true);
      component.readonly = header;
      tick();
      expect(component.readonly).toEqual(header);
    }))
  })

  describe('check row',()=>{
    it('should update row', fakeAsync( ()=>{
      const header = coerceBooleanProperty(true);
      component.row = header;
      tick();
      expect(component.row).toEqual(header);
    }))
  })

});
