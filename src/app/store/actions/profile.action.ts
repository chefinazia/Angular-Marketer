import { Action } from '@ngrx/store';
import {Profile } from '../models/profile.model';
export enum AuthActionType {
  UPDATE_PROFILE = '[PROFILE] Update Profile',
}
export class UpdateProfileAction implements Action {
  readonly type = AuthActionType.UPDATE_PROFILE;
  //add an optional payload
  constructor(public payload: Profile) {}
}
export type ProfileAction = UpdateProfileAction;
