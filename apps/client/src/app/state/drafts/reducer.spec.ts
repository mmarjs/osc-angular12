import { fromDraftsActions, LoadDraftsSuccess } from '@ocean/client/state';
import { Draft, DraftDTO, Job, PagedResponse } from '@ocean/api/shared';
import { draftsReducer } from '@ocean/client/state/drafts/reducer';
import { initialState } from '@ocean/client/state/drafts/state';

describe('Drafts Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = null;

      const result = draftsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  it('should set isLoading = true if DraftsActionTypes.SaveDraft action is called', () => {
    const draftDTO: DraftDTO<Job> = {
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };
    const action = new fromDraftsActions.SaveDraft(draftDTO);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isLoading', true);
  });

  it('should set isLoading = false if DraftsActionTypes.SaveDraftSuccess action is called', () => {
    const draft: Draft<Job> = {
      id: '1',
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };
    const action = new fromDraftsActions.SaveDraftSuccess(draft);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isLoading', false);
  });

  it('should set entities and ids = ["1"] if DraftsActionTypes.SaveDraftSuccess action is called', () => {
    const draft: Draft<Job> = {
      id: '1',
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };

    const ids = ['1'];
    const entities = {['1']: draft};
    const action = new fromDraftsActions.SaveDraftSuccess(draft);
    const result = draftsReducer(initialState, action);
    expect(result).toHaveProperty('ids', ids);
    expect(result).toHaveProperty('entities', entities);
  });

  it('should set isLoading = false if DraftsActionTypes.LoadDraftsSuccess action is called', () => {
    const pagedResponse: PagedResponse<Job> = {
      currentPageNo: 1,
      data: [
        {
          id: 2,
          name: 'name'
        }
      ],
      totalPages: 0,
      totalRecords: 0
    };
    const action = new LoadDraftsSuccess(pagedResponse);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isLoading', false);
  });

  it('should set drafts if DraftsActionTypes.LoadDraftsSuccess action is called', () => {
    const pagedResponse: PagedResponse<Job> = {
      currentPageNo: 1,
      data: [
        {
          id: 2,
          name: 'name'
        }
      ],
      totalPages: 0,
      totalRecords: 0
    };
    const action = new LoadDraftsSuccess(pagedResponse);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('drafts', pagedResponse);
  });

  it('should set isLoading = false if DraftsActionTypes.SaveDraftFailure action is called', () => {
    const error: Error = new Error('error');
    const action = new fromDraftsActions.SaveDraftFailure(error);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isLoading', false);
  });

  it('should set selectedDraftId = 1 if DraftsActionTypes.SetSelectedDraft action is called', () => {
    const draftId = '1';
    const action = new fromDraftsActions.SetSelectedDraft(draftId);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('selectedDraftId', draftId);
  });

  it('should set isUpdating = true if DraftsActionTypes.UpdateDraft action is called', () => {
    const draftDTO: DraftDTO<Job> = {
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };
    const action = new fromDraftsActions.UpdateDraft(draftDTO);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isUpdating', true);
  });

  it('should set isUpdating = false if DraftsActionTypes.UpdateDraftSuccess action is called', () => {
    const draftDTO: DraftDTO<Job> = {
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };
    const action = new fromDraftsActions.UpdateDraftSuccess(draftDTO);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isUpdating', false);
  });

  it('should set entities by id = 1 if DraftsActionTypes.UpdateDraftSuccess action is called', () => {
    const id = '1';
    const draftDTO: Draft<Job> = {
      id,
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };
    const ids = [id];
    const entities = {[id]: draftDTO};
    const action = new fromDraftsActions.UpdateDraftSuccess(draftDTO);
    const result = draftsReducer({...initialState, selectedDraftId: id, ids, entities: {[id]: null}}, action);
    console.log('result: ', result);
    expect(result).toHaveProperty('entities', entities);
  });

  it('should set isUpdating = false if DraftsActionTypes.UpdateDraftFailure action is called', () => {
    const error: Error = new Error('error');
    const action = new fromDraftsActions.UpdateDraftFailure(error);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isUpdating', false);
  });

  it('should set isUpdating = true if DraftsActionTypes.DeleteDraft action is called', () => {
    const draft = '1';
    const action = new fromDraftsActions.DeleteDraft(draft);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isUpdating', true);
  });

  it('should set isUpdating = false if DraftsActionTypes.DeleteDraftSuccess action is called', () => {
    const draft = '1';
    const action = new fromDraftsActions.DeleteDraftSuccess(draft);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isUpdating', false);
  });

  it('should remove entities with id = 1 if DraftsActionTypes.DeleteDraftSuccess action is called', () => {
    const draftObj: Draft<Job> = {
      id: '1',
      content: null,
      link: {
        path: '/path',
        meta: null
      },
      name: 'name'
    };

    const ids = ['1'];
    const entities = {['1']: draftObj};

    const draft = '1';
    const action = new fromDraftsActions.DeleteDraftSuccess(draft);
    const init = {...initialState, ids, entities};
    const result = draftsReducer(init, action);

    expect(result).toHaveProperty('ids', []);
    expect(result).toHaveProperty('entities', {});
  });

  it('should set isUpdating = false if DraftsActionTypes.DeleteDraftFailure action is called', () => {
    const error: Error = new Error('error');
    const action = new fromDraftsActions.DeleteDraftFailure(error);
    const result = draftsReducer(initialState, action);

    expect(result).toHaveProperty('isUpdating', false);
  });
});
