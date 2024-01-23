import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DeletedFiles, FormGalleryComponent } from '@ocean/client/common/forms';
import { MockComponent, MockPipe } from 'ng-mocks';
import { BoatsCreateMediaComponent } from './media.component';

const boat1 = new File(['boat1'], 'boat1.png', {
  type: 'image/png'
});

const boat2 = new File(['boat2'], 'boat2.png', {
  type: 'image/png'
});

describe('BoatsCreateMediaComponent', () => {
  let component: BoatsCreateMediaComponent;
  let fixture: ComponentFixture<BoatsCreateMediaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MockComponent(FormGalleryComponent),
        BoatsCreateMediaComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatsCreateMediaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
      files: formBuilder.array([
        formBuilder.group({
          file: boat1
        }),
        formBuilder.group({
          file: boat2
        })
      ])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check onDeleteImages', () => {
    it('should remove a file from the files', () => {
      const deletedFiles: DeletedFiles = {
        deletedFiles: [boat1],
        urls: []
      };
      component.onDeleteImages(deletedFiles);
      expect(component.files.length).toEqual(1);
      expect(component.files.value[0].file).toEqual(boat2);
    });

    it('should remove multiple files from the files', () => {
      const deletedFiles: DeletedFiles = {
        deletedFiles: [boat1, boat2],
        urls: []
      };
      component.onDeleteImages(deletedFiles);
      expect(component.files).toHaveLength(0);
    });

    it('should not remove a file if it does not exist in the files', () => {
      const deletedFiles: DeletedFiles = {
        deletedFiles: [new File(['boat3'], 'boat3.png', {
          type: 'image/png'
        })],
        urls: []
      };
      component.onDeleteImages(deletedFiles);
      expect(component.files).toHaveLength(2);
    });

    it('should not remove a file if the files is empty', () => {
      component.form = formBuilder.group({
        files: formBuilder.array([]),
      });
      const deletedFiles: DeletedFiles = {
        deletedFiles: [boat1],
        urls: []
      };
      component.onDeleteImages(deletedFiles);
      expect(component.files).toHaveLength(0);
    });
  });
});
