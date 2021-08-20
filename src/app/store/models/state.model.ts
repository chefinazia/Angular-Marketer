import { Profile } from './profile.model';
import {History} from './history.model'

export interface State {
  readonly profile: Profile
  readonly history: History
}
