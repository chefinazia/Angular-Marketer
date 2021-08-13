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
  action: ProfileAction
) {
  switch (action.type) {
    case AuthActionType.UPDATE_PROFILE:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
