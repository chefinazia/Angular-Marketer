import { Profile } from '../models/profile.model';
import { UpdateProfileAction, ProfileAction,AuthActionType } from '../actions/profile.action';
//create a dummy initial state
const initialState: Profile ={
  uid: "",
  displayName: "",
  email: "",
  photoURL:""
}
export function profileReducer(
  state: Profile = initialState,
  action
) {
  switch (action.type) {
    case AuthActionType.UPDATE_PROFILE:
      return {...state, ...action.payload};
      case AuthActionType.UPDATE_IMAGE:
      return {...state,photoURL:action.payload };
    default:
      return state;
  }
}
