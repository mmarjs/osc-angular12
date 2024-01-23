import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormControl } from '@angular/forms';
import { JobTypes } from '@ocean/api/shared';
import { WorkDescriptionComponent } from './work-description.component';
import { MockProvider } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';

describe('WorkDescriptionComponent', () => {
  let component: WorkDescriptionComponent;
  let fixture: ComponentFixture<WorkDescriptionComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkDescriptionComponent ],
      providers: [
        MockProvider(TranslateService, {
          instant: v => v
        }),
        FormBuilder,
      ],
    })
      .overrideTemplate(WorkDescriptionComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDescriptionComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
      name: new FormControl(),
      description: new FormControl(),
      type: new FormControl('REPAIR'),
      medias: formBuilder.group({
        files: formBuilder.array([
          formBuilder.group({
            file: 'boat1.jpg',
            type: 'image/jpeg',
          }),
          formBuilder.group({
            file: 'boat2.jpg',
            type: 'image/jpeg',
          }),
          formBuilder.group({
            file: 'boat3.jpg',
            type: 'image/jpeg',
          }),
        ]),
      }),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check getters', () => {
    it('should get mediasForm', fakeAsync( () => {
      tick();
      expect(component.mediasForm).toEqual(component.form.get('medias'));
    }));
    it('should get totalMedias', fakeAsync( () => {
      tick();
      expect(component.totalMedias).toEqual(3);
    }));
    it('should get type', ( () => {
      expect(component.type).toEqual('REPAIR');
    }));
  });

  describe('check ngOnInit', () => {
    const mockJobTypes = [
      {
        label: 'APPLICATION.REPAIR_REFIT',
        value: JobTypes.REPAIR,
        checked: true,
      },
      {
        label: 'APPLICATION.SURVEY',
        value: JobTypes.SURVEY,
        checked: false,
      },
    ];
    it('check jobTypesValues', () => {
      component.ngOnInit();
      expect(component.jobTypesValues.value).toEqual(mockJobTypes);
    });
  });

  describe('check handleCarouselUseCaseEvents', () => {
    const event = {
      name: 'transitionend',
    };
    it('component.carouselThumbsUseCase.select to be called', () => {
      component.carouselThumbsUseCase = {
        select: () => true,
      };
      component.carouselUseCase = {
        slideCounter: true,
      };
      const spy = jest.spyOn(component.carouselThumbsUseCase, 'select');
      component.handleCarouselUseCaseEvents(event);
      expect(spy).toBeCalled();
    });
  });

  describe('check onClearForm', () => {
    it('component.form.reset', () => {
      const spy = jest.spyOn(component.form, 'reset');
      component.onClearForm();
      expect(spy).toBeCalled();
    });
  });

  describe('check onDeleteImages', () => {
    it('should remove a file from the files', () => {
      const deletedFiles = ['boat1.jpg'];
      component.onDeleteImages({ deletedFiles });
      expect(component.files.length).toBe(2);
      expect(component.files.value[0].file).toBe('boat2.jpg');
    });

    it('should remove multiple files from the files', () => {
      const deletedFiles = ['boat1.jpg', 'boat2.jpg'];
      component.onDeleteImages({ deletedFiles });
      expect(component.files.length).toBe(1);
      expect(component.files.value[0].file).toBe('boat3.jpg');
    });

    it('should not remove any files if deletedFiles is empty', () => {
      const deletedFiles = [];
      component.onDeleteImages({ deletedFiles });
      expect(component.files.length).toBe(3);
    });

    it('should not remove any files if deletedFiles contains invalid file names', () => {
      const deletedFiles = ['test3.jpg', 'test4.jpg'];
      component.onDeleteImages({ deletedFiles });
      expect(component.files.length).toBe(3);
    });

    it('should not remove any files if the files is empty', () => {
      component.form = formBuilder.group({
        medias: formBuilder.group({
          files: formBuilder.array([]),
        }),
      });
      const deletedFiles = ['boat1.jpg', 'boat2.jpg'];
      component.onDeleteImages({ deletedFiles });
      expect(component.files.length).toBe(0);
    });
  });
});
