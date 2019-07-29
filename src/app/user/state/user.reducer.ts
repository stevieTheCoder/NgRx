import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
 maskUserName: false
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'TOGGLE_MASK_USERNAME':
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
