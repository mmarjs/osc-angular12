import { of } from "rxjs";

export let mockDraftsFacade = {
  drafstEntities$: of({ draft: { content: 'some draft content' } }),
  updateDraft: () => true,
  saveDraft: () => true,
  setSelectedDraft: (val: boolean | null) => true,
  deleteDraft: () => true,
  loadDrafts: () => true,
  isUpdating$:of(true),
  drafts$: of({
    currentPageNo: 1,
    totalPages: 1,
    totalRecords: 0,
    data: [{
      description: "test",
      id: 0,
      name: "test",
      type: "test",
      isStarted: true,
      isFinished: false,
    }]
  })
}