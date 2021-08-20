import { Action } from '@ngrx/store';
import {History } from '../models/history.model'
export enum historyActionType {
  GET_HISTORY = '[HISTORY] Get History',
  CLEAR_HISTORY = '[HISTORY] Clear History',
}
export class historyAction implements Action {
  readonly type = historyActionType.GET_HISTORY;
  // readonly type = AuthActionType.UPDATE_IMAGE;
  //add an optional payload
  constructor(public payload: History) {}
}

export class historyClearAction implements Action {
  readonly type = historyActionType.CLEAR_HISTORY;
  // readonly type = AuthActionType.UPDATE_IMAGE;
  //add an optional payload
  constructor() {}
}
