import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGalleryUploadComponent } from './upload.component';

describe('FormGalleryUploadComponent', () => {
  let component: FormGalleryUploadComponent;
  let fixture: ComponentFixture<FormGalleryUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormGalleryUploadComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGalleryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on onclick', () => {
    it('should call input.nativeElement.click', () => {
      const spy = jest.spyOn(component.input.nativeElement, 'click')
      component.onclick();
      expect(spy).toBeCalled()
    })
  })

  describe('on doUpload', () => {
    it('should call upload.emit', () => {
      let files = [{ name: 'test.txt', type: 'txt' }] as any
      const spy = jest.spyOn(component.upload, 'emit')
      component.doUpload(files);
      expect(spy).toBeCalled()
    })
  })

});
