import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierService } from '@ocean/shared/services';
import { TestMatModule } from '@ocean/testing/helpers/test.module';
import { MockComponent, MockProvider } from 'ng-mocks';
import { AppFormsImports } from '../forms.imports';
import { FormLocationComponent } from '../location';
import {
  DEFAULT_SUPPORTED_MEDIA_FORMATS,
  FormGalleryComponent,
} from './gallery.component';
import { FormGalleryItemComponent } from './item';
import { FormGalleryUploadComponent } from './upload';
import { LocalizationService } from '@ocean/internationalization';

let mockNotifierService = {
  error: jest.fn(),
};

describe('FormGalleryComponent', () => {
  let component: FormGalleryComponent;
  let fixture: ComponentFixture<FormGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ...AppFormsImports, TestMatModule],
      declarations: [
        MockComponent(FormLocationComponent),
        MockComponent(FormGalleryItemComponent),
        MockComponent(FormGalleryUploadComponent),
        FormGalleryComponent,
      ],
      providers: [
        { provide: NotifierService, useValue: mockNotifierService },
        MockProvider(LocalizationService),
      ],
    })
      .overrideTemplate(FormGalleryComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    const builder = TestBed.get(FormBuilder);

    fixture = TestBed.createComponent(FormGalleryComponent);
    component = fixture.componentInstance;
    component.form = builder.group({files: new FormArray([])});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on addItem', () => {
    let file = { type: 'txt', name: 'test' } as any;
    it('should call notifierService.error', () => {
      const spy = jest.spyOn(mockNotifierService, 'error');
      component.accept = DEFAULT_SUPPORTED_MEDIA_FORMATS;
      component.addItem(file);
      expect(spy).toBeCalled();
    });
    it('should call files.clear', () => {
      let file = { type: 'image', name: 'test' } as any;
      component.multiple = false;
      component.files.clear();
      const spy = jest.spyOn(component.files, 'clear');
      component.addItem(file);
      expect(spy).toBeCalled();
    });
    it('check fileAdded.emit to be called and check files.length', () => {
      const spy = jest.spyOn(component.fileAdded, 'emit');
      let file = { type: 'image', name: 'test' } as any;
      component.files.clear();
      component.addItem(file);
      expect(component.files.length).toBeGreaterThan(0);
      expect(spy).toBeCalled();
    });
  });
});
