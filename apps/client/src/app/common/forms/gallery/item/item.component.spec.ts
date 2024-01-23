import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule, MockPipe } from 'ng-mocks';
import { FormGalleryItemComponent, UploadItemType } from './item.component';
import userEvent from '@testing-library/user-event';
import { render, RenderResult, screen } from '@testing-library/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { forwardRef } from '@angular/core';

let component: FormGalleryItemComponent;
let fixture: ComponentFixture<FormGalleryItemComponent>;
let container: RenderResult<FormGalleryItemComponent, FormGalleryItemComponent>;

const deps = {
  imports: [MockModule(FormsModule), NoopAnimationsModule, MatIconModule],
  declarations: [FormGalleryItemComponent, MockPipe(TranslatePipe, v => v)],
};

describe('FormGalleryItemComponent', () => {
  beforeEach(async () => {
    container = await render(FormGalleryItemComponent, {
      ...deps
    });

    fixture = container.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call writeValue', () => {
    component.formGroupName = 'test';
    const control = {
      control: new FormGroup({
        test: new FormControl(''),
      }),
    };
    component['parent'] = control as any;
    const spy = jest.spyOn(component, 'writeValue');
    component.ngOnInit();
    expect(spy).toBeCalled();
  });

  it('validate should return null', () => {
    const spy = jest.spyOn(component, 'validate');
    component.validate();
    expect(spy).toReturnWith(null);
  });

  it('check this.value (string)', () => {
    const value = {file: 'test'};
    component.writeValue(value);
    expect(component.value).toEqual('test');
  });

  it('check this.value (file)', () => {
    const value = {
      file: new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      }),
    };
    component.writeValue(value);
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.value).toEqual('data:text/plain;base64,Zm9v');
    });
  });
});

describe('FormGalleryItemComponent - providers', () => {
  beforeEach(async () => {
    container = await render(FormGalleryItemComponent, {
      ...deps
    });

    fixture = container.fixture;
    component = fixture.componentInstance;
  });

  it('check NG_VALUE_ACCESSOR', () => {
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
    fixture.detectChanges();
  });

  it('check NG_VALIDATORS', () => {
    fixture.debugElement.injector.get(NG_VALIDATORS);
    fixture.detectChanges();
  });
});

describe('FormGalleryItemComponent - Other type', () => {
  beforeEach(async () => {
    container = await render(FormGalleryItemComponent, {
      ...deps
    });

    fixture = container.fixture;
    component = fixture.componentInstance;
  });

  it('should call delete for Other type', async () => {
    component.value = 'data:text/plain;base64,Zm9v';
    component.type = UploadItemType.OTHER;
    fixture.detectChanges();

    const spy = jest.spyOn(component.delete, 'emit');
    await userEvent.click(screen.getByRole('none'));

    expect(spy).toHaveBeenCalledWith(component.value);
  });

  it('should call unselect for Other type', async () => {
    component.value = 'data:text/plain;base64,Zm9v';
    component.type = UploadItemType.OTHER;
    component.selected = true;
    fixture.detectChanges();

    const spy = jest.spyOn(component.unselected, 'emit');
    await userEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalledWith(component.value);
  });
});

describe('FormGalleryItemComponent - Image type', () => {
  beforeEach(async () => {
    container = await render(FormGalleryItemComponent, {
      ...deps
    });

    fixture = container.fixture;
    component = fixture.componentInstance;
  });

  it('should call delete for Image type', async () => {
    component.value = 'image.png';
    component.type = UploadItemType.IMAGE;
    fixture.detectChanges();

    const spy = jest.spyOn(component.delete, 'emit');
    await userEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('should call unselect for Image type', async () => {
    component.value = 'data:text/plain;base64,Zm9v';
    component.type = UploadItemType.IMAGE;
    component.selected = true;
    fixture.detectChanges();

    const spy = jest.spyOn(component.unselected, 'emit');
    await userEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalledWith(component.value);
  });
});
