import { draftsAdapter, initialState, State } from './state';
import { DraftsAction, DraftsActionTypes } from './actions';

export function draftsReducer(
  state = initialState,
  action: DraftsAction
): State {
  switch (action?.type) {

    case DraftsActionTypes.SaveDraft:
      return {
        ...state,
        isLoading: true
      };

    case DraftsActionTypes.SaveDraftSuccess:
      return draftsAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
      });

    case DraftsActionTypes.LoadDraftsSuccess:
      return  {
        ...state,
        drafts: action.payload,
        isLoading: false,
      };
    case DraftsActionTypes.SaveDraftFailure:
      return {
        ...state,
        isLoading: false
      };

    case DraftsActionTypes.SetSelectedDraft:
      return {
        ...state,
        selectedDraftId: action.payload
      };

    case DraftsActionTypes.UpdateDraft:
      return {
        ...state,
        isUpdating: true
      };

    case DraftsActionTypes.UpdateDraftSuccess:
      return draftsAdapter.updateOne({
        id: state.selectedDraftId,
        changes: action.payload
      }, {
        ...state,
        isUpdating: false
      });

    case DraftsActionTypes.UpdateDraftFailure:
      return {
        ...state,
        isUpdating: false
      };

    case DraftsActionTypes.DeleteDraft:
      return {
        ...state,
        isUpdating: true
      };

    case DraftsActionTypes.DeleteDraftSuccess:
      return draftsAdapter.removeOne(action.payload, {
        ...state,
        isUpdating: false
      });

    case DraftsActionTypes.DeleteDraftFailure:
      return {
        ...state,
        isUpdating: false
      };

    default:
      return state;
  }
}
