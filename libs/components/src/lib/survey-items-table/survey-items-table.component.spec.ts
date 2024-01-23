import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyItemsTableComponent } from './survey-items-table.component';

describe('SurveyItemsTableComponent', () => {
  let component: SurveyItemsTableComponent;
  let fixture: ComponentFixture<SurveyItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyItemsTableComponent ]
    })
    .overrideTemplate(SurveyItemsTableComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

describe('check toggleShowMore',()=>{
  let row={showMore:true}
  it('showMore property to be toggled',()=>{
   component.toggleShowMore(row)
   expect(row.showMore).toBeFalsy()
  })
})

});
