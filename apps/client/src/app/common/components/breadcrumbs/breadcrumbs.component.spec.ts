import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizationService } from '@ocean/internationalization';
import { LinkDirectiveMock } from '@ocean/shared';
import { TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';
import { of } from 'rxjs';
import { AppStateTestModule, RouterFacade } from '../../../state';
import { BreadcrumbsComponent } from './breadcrumbs.component';

let routerTestFacade={
  state$:of({
    route: "/dashboard",
    url: "/dashboard",
    params: {},
    queryParams: {}
})
}

let localizationService={
  initLanguage:jest.fn()
}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppStateTestModule.forParent(), TestStoreEnvModule, TestModule],
      declarations: [LinkDirectiveMock, BreadcrumbsComponent],
      providers: [{provide:RouterFacade,useValue:routerTestFacade},{provide:LocalizationService,useValue:localizationService}]
    }).overrideTemplate(BreadcrumbsComponent,'').compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("On Init", () => {
    it("should init address form", fakeAsync(() => {
      component.ngOnInit();
      expect(component.paths.length).toBeGreaterThan(0)
    }));
  });


});
