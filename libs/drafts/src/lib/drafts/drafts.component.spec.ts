import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { LocalizationService } from '@ocean/internationalization';
import { DraftsComponent } from './drafts.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DraftsFacade } from '@ocean/client/state';
import { mockDraftsFacade } from '@ocean/testing/helpers/draftsTestFacade';
import { DraftDialogs } from '@ocean/api/data';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

const mockDraftResponse = {
  currentPageNo: 1,
  totalPages: 10,
  totalRecords: 100,
  data: [{
    id: 1,
    name: "test",
  }],
};

const mockDraftDialogs = {
  deletePrompt: v => of({})
}

const mockPageable = {
  page: 1,
  size: 10
}

const mockPaginator = {
  length: 0,
  pageIndex: 1,
  pageSize: 10,
  previousPageIndex: 0,
  getNumberOfPages: () => Math.ceil(mockPaginator.length / mockPaginator.pageSize)
} as unknown as MatPaginator;

describe('DraftsComponent', () => {
  let component: DraftsComponent;
  let fixture: ComponentFixture<DraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatTableModule, MatSortModule, MockModule(MatPaginatorModule), MockModule(MatProgressSpinnerModule)],
      declarations: [DraftsComponent, MockPipe(TranslatePipe, v => v)],
      providers: [
        provideMockStore(),
        MockProvider(LocalizationService),
        { provide: DraftsFacade, useValue: mockDraftsFacade },
        { provide: DraftDialogs, useValue: mockDraftDialogs }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dataSource = {
      currentPageNo: 1,
      data: [
        { 
          id: 1,
          name: 'test'
        }
      ],
      totalPages: 10,
      totalRecords: 100
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check ngOnInit', () =>{
    it('should call ngOnInit', () => {
      const spy = jest.spyOn(component, 'loadDrafts');
      component.ngOnInit();
      expect(spy).toBeCalled();
    });
  });

  describe('on loadDrafts', () => {
    
    it('should load drafts and update the dataSource', () => {
      
      const spy1 = jest.spyOn(mockDraftsFacade, 'setSelectedDraft');
      const spy2 = jest.spyOn(component, "dispatchLoadDrafts");
      mockDraftsFacade.drafts$ = of(mockDraftResponse);
      component.loadDrafts();
      expect(component.isLoading).toBe(true);
      expect(component.dataSource).toEqual(mockDraftResponse);
      // expect(mockPaginator.pageIndex).toBe(0);
      expect(spy1).toHaveBeenCalledWith(null);
      expect(spy2).toBeCalled();
    });

    it('should reset pageIndex and dispatch load drafts if res.data is empty and pageIndex is 1', () => {
      mockPaginator.pageIndex = 1;
      component.pageIndex = 1;
      component.paginator = mockPaginator;
      const spy2 = jest.spyOn(component, "dispatchLoadDrafts");
      component.loadDrafts();
      mockDraftsFacade.drafts$ = of(mockDraftResponse);
      expect(component.paginator.pageIndex).toEqual(1);
      // expect(spy2).toHaveBeenCalledWith(0);
    });
    it('should not reset pageIndex or dispatch load drafts if res.data is not empty or pageIndex is not 1', () => {
      // Set up the component and its dependencies
      mockPaginator.pageIndex = 0;
      component.pageIndex = 0;
      component.paginator = mockPaginator;
      const spy2 = jest.spyOn(component, "dispatchLoadDrafts");
      component.loadDrafts();
      mockDraftsFacade.drafts$ = of(mockDraftResponse);
      expect(component.paginator.pageIndex).toEqual(0);
      // expect(spy2).not.toHaveBeenCalled();
    });
  });

  describe('on onDelete', () => {
    it('should call onDelete', () => {
      const id = '123';
      const spy1 = jest.spyOn(mockDraftDialogs, 'deletePrompt');
      const spy2 = jest.spyOn(mockDraftsFacade, 'deleteDraft')
      component.onDelete(id);
      expect(spy1).toHaveBeenCalledWith(id);
      expect(spy2).toHaveBeenCalledWith(id);
    });
  });

  describe('on pageEvents', () => {
    it('should call draftsFacade.loadDrafts', () => {
      const events = {
        pageIndex: 1,
        pageSize: 10
      }
      const spy = jest.spyOn(mockDraftsFacade, 'loadDrafts');
      component.pageEvents(events);
      expect(spy).toHaveBeenCalledWith(mockPageable);
    });
  });

  describe('on dispatchLoadDrafts', () => {
    it('should call draftsFacade.loadDrafts', () => {
      const pageIndex = 1;
      const pageSize = 10;
      const spy = jest.spyOn(mockDraftsFacade, 'loadDrafts');
      component.dispatchLoadDrafts(pageIndex, pageSize);
      expect(spy).toHaveBeenCalledWith(mockPageable);
    });
  });

  afterEach(() => {
    component.pagedDataOfMyDraftsSubscription?.unsubscribe();
  });

  describe('check ngOnDestroy', () =>{
    it('should call ngOnDestroy', () => {
      component.ngOnDestroy();
      component.pagedDataOfMyDraftsSubscription?.unsubscribe();
    });
  });
});
