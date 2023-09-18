import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromMenu from './reducers/menu.reducer';


export interface AppState {

  [fromMenu.menuFeatureKey]: fromMenu.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromMenu.menuFeatureKey]: fromMenu.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
