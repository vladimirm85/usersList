import { ActionTypes, Action } from '../actions';

export interface DialogStateInterface {
  open: boolean;
  message: string;
  callback: Function;
  args?: any;
}

const initialState: DialogStateInterface = {
  open: false,
  message: '',
  callback: () => {},
  args: null,
};

export const dialogReducer = (
  state = initialState,
  action: Action
): DialogStateInterface => {
  switch (action.type) {
    case ActionTypes.openDialog:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        callback: action.payload.callback,
        args: action.payload.args,
      };
    case ActionTypes.closeDialog:
      return {
        ...state,
        open: false,
        callback: () => {},
        args: null,
      };
    default:
      return state;
  }
};
