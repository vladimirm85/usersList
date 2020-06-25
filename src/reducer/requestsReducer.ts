import { ActionTypes, Action } from '../actions';

export interface RequestsStateInterface {
  isLoading: boolean;
  requestError: Error;
}

const initialState: RequestsStateInterface = {
  isLoading: true,
  requestError: new Error(),
};

export const requestsReducer = (
  state = initialState,
  action: Action
): RequestsStateInterface => {
  switch (action.type) {
    case ActionTypes.requestApi:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.requestSuccess:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.requestFailed:
      return {
        ...state,
        isLoading: false,
        requestError: action.payload.requestError,
      };
    default:
      return state;
  }
};
