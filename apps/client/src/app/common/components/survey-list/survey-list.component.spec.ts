import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IconsModule } from '@ocean/icons';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { MockModule } from 'ng-mocks';

import { SurveyListComponent } from './survey-list.component';

describe('LineWrapperComponent', () => {
  let component: SurveyListComponent;
  let fixture: ComponentFixture<SurveyListComponent>;
  let fb = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, MockModule(IconsModule)],
      declarations: [SurveyListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListComponent);
    component = fixture.componentInstance;
    component.form = fb.group({
      jobItems: fb.array([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () => {
    it('to be truthy', () => {
      const spy = jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(spy).toBeTruthy();
    });
  });

  describe('on createSurveyGroup', () => {
    it('createSurveyGroup should return', () => {
      const spy = jest.spyOn(component, 'createSurveyGroup');
      component.createSurveyGroup();
      expect(spy).toReturn();
    });
  });

  describe('on addSurvey', () => {
    it('check length of surveyItems', () => {
      component.addSurvey();
      expect(component.surveyItems.length).toBeGreaterThan(0);
    });
  });

  describe('on deleteSurvey', () => {
    it('check length of surveyItems', () => {
      component.addSurvey();
      component.addSurvey();
      component.deleteSurvey(0);
      expect(component.surveyItems.length).toBe(1);
    });
  });
});
