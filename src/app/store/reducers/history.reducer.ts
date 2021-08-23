import { History } from '../models/history.model';
import { historyAction,historyActionType } from '../actions/history.action';
//create a dummy initial state
const initialState=[]
export function historyReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case historyActionType.GET_HISTORY:
      return [...state, action.payload];
      case historyActionType.CLEAR_HISTORY:
      return initialState
    default:
      return state;
  }
}
