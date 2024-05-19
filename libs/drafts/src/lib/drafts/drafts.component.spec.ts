import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { LocalizationService } from '@ocean/internationalization';
import { DraftsComponent } from './drafts.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DraftsFacade } from '@ocean/client/state';
import { mockDraftsFacade } from '@ocean/testing/helpers/draftsTestFacade';
import { DraftDialogs } from '@ocean/api/data';
import { firstValueFrom, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Draft, Job } from '@ocean/api/shared';

const mockDraftResponse = {
  currentPageNo: 1,
  totalPages: 10,
  totalRecords: 100,
  data: [
    {
      id: 1,
      name: 'test',
    },
  ],
};

const mockDraftDialogs = {
  deletePrompt: (v) => of({}),
};

const mockPageable = {
  page: 1,
  size: 10,
};

const mockPaginator = {
  length: 0,
  pageIndex: 1,
  pageSize: 10,
  previousPageIndex: 0,
  getNumberOfPages: () =>
    Math.ceil(mockPaginator.length / mockPaginator.pageSize),
} as unknown as MatPaginator;

describe('DraftsComponent', () => {
  let component: DraftsComponent;
  let fixture: ComponentFixture<DraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MockModule(MatPaginatorModule),
        MockModule(MatProgressSpinnerModule),
      ],
      declarations: [DraftsComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [
        provideMockStore(),
        MockProvider(LocalizationService),
        { provide: DraftsFacade, useValue: mockDraftsFacade },
        { provide: DraftDialogs, useValue: mockDraftDialogs },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.dataSource = mockDraftResponse;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const spy = jest.spyOn(component, 'loadDrafts');
    component.ngOnInit();
    expect(spy).toBeCalled();
  });

  it('should load drafts and update the dataSource', async () => {
    const expected = {
      currentPageNo: 100,
      totalPages: 100,
      totalRecords: 0,
      data: [
        {
          description: 'wf4wf5',
          id: 1,
          name: 'wdad',
          type: 'wdadw',
          isStarted: true,
          isFinished: false,
        },
      ],
    };

    mockDraftsFacade.drafts$ = of(expected);
    const spy2 = jest.spyOn(component, 'dispatchLoadDrafts');
    const spy1 = jest.spyOn(mockDraftsFacade, 'setSelectedDraft');
    component.loadDrafts();
    expect(component.isLoading).toEqual(true);
    const data = await firstValueFrom(component.drafts$);
    fixture.detectChanges();
    expect(component.dataSource).toEqual(data);
    expect(spy1).toHaveBeenCalledWith(null);
    expect(spy2).toBeCalled();
  });

  it('should reset pageIndex and dispatch load drafts if res.data is empty and pageIndex is 1', () => {
    mockPaginator.pageIndex = 1;
    component.pageIndex = 1;
    component.paginator = mockPaginator;
    component.loadDrafts();
    mockDraftsFacade.drafts$ = of(mockDraftResponse);
    expect(component.paginator.pageIndex).toEqual(1);
  });

  it('should not reset pageIndex or dispatch load drafts if res.data is not empty or pageIndex is not 1', () => {
    // Set up the component and its dependencies
    mockPaginator.pageIndex = 0;
    component.pageIndex = 0;
    component.paginator = mockPaginator;
    component.loadDrafts();
    mockDraftsFacade.drafts$ = of(mockDraftResponse);
    expect(component.paginator.pageIndex).toEqual(0);
  });

  it('should call onDelete', () => {
    const data = { id: '123', name: 'abc', link: null, content: null } as Draft<Job>;
    const promptSpy = jest.spyOn(mockDraftDialogs, 'deletePrompt');
    const deleteSpy = jest.spyOn(mockDraftsFacade, 'deleteDraft');
    component.onDelete(data);
    expect(promptSpy).toHaveBeenCalledWith(data.name);
    expect(deleteSpy).toHaveBeenCalledWith(data.id);
  });

  it('should call draftsFacade.loadDrafts', () => {
    const events = {
      pageIndex: 1,
      pageSize: 10,
    };
    const spy = jest.spyOn(mockDraftsFacade, 'loadDrafts');
    component.pageEvents(events as PageEvent);
    expect(spy).toHaveBeenCalledWith(mockPageable);
  });

  it('should call draftsFacade.loadDrafts', () => {
    const pageIndex = 1;
    const pageSize = 10;
    const spy = jest.spyOn(mockDraftsFacade, 'loadDrafts');
    component.dispatchLoadDrafts(pageIndex, pageSize);
    expect(spy).toHaveBeenCalledWith(mockPageable);
  });
});
