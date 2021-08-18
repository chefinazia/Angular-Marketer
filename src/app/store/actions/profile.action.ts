import { Action } from '@ngrx/store';
import {Profile } from '../models/profile.model';
export enum AuthActionType {
  UPDATE_PROFILE = '[PROFILE] Update Profile',
  UPDATE_IMAGE = '[PROFILE] Update Image',
}
export class UpdateProfileAction implements Action {
  readonly type = AuthActionType.UPDATE_PROFILE;
  // readonly type = AuthActionType.UPDATE_IMAGE;
  //add an optional payload
  constructor(public payload: Profile) {}
}

export class UpdateImageAction implements Action {
  readonly type = AuthActionType.UPDATE_IMAGE;
  // readonly type = AuthActionType.UPDATE_IMAGE;
  //add an optional payload
  constructor(public payload : string) {}
}
export type ProfileAction = UpdateProfileAction;
