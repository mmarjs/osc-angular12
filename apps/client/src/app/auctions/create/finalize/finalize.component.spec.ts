import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { FinalizeComponent } from './finalize.component';

describe('FinalizeComponent', () => {
  let component: FinalizeComponent;
  let fixture: ComponentFixture<FinalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizeComponent ]
    })
    .overrideTemplate(FinalizeComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizeComponent);
    component = fixture.componentInstance;
    component.form=new FormGroup({
      auctionStartDate:new FormControl('15/08/2023')
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('',()=>{
    // it('startDt to be form[auctionStartDate].value',()=>{
    //   component.onch();
    //   expect(component.startDt).toEqual('15/08/2023')
    // })
  })

});
