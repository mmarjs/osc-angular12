import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyInformationComponent } from './survey-information.component';

describe('SurveyInformationComponent', () => {
  let component: SurveyInformationComponent;
  let fixture: ComponentFixture<SurveyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ SurveyInformationComponent ]
    })
    .overrideTemplate(SurveyInformationComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyInformationComponent);
    component = fixture.componentInstance;
    component.descriptionForm=new FormGroup({
      type:new FormControl('repair')
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('',()=>{
    it('should get auctionType', fakeAsync( ()=>{
      tick()
      expect(component.auctionType).toEqual('repair');
    }))
    it('should get data', fakeAsync( ()=>{
      tick()
      expect(component.data).toEqual({ type: 'repair' });
    }))
  })

});
