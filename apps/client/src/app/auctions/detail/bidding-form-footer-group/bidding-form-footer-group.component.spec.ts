import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterFacade } from '@ocean/client/state';
import { TestMatModule, TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';
import { BiddingFormFooterGroupComponent } from './bidding-form-footer-group.component';
import { mockRouterFacade } from '@ocean/testing/helpers/routerTestFacade';
import { of } from 'rxjs';
import { JobDialogs } from '@ocean/api/data';
import { LocalizationService } from '@ocean/internationalization';
import { MockProvider } from 'ng-mocks';

let mockjobDialogs = {
  openDocumentsDialog:()=> of({ files: true })
}

describe('BiddingFormFooterGroupComponent', () => {
  let component: BiddingFormFooterGroupComponent;
  let fixture: ComponentFixture<BiddingFormFooterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({})
      .overrideTemplate(BiddingFormFooterGroupComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingFormFooterGroupComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      documents: new FormControl('test.txt'),
      bidderLocation: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on formBidSubmit', () => {
    it('should call component.bidSubmit.emit', () => {
      const spy = jest.spyOn(component.bidSubmit, 'emit')
      component.formBidSubmit();
      expect(spy).toBeCalled();
    })
  });

});
