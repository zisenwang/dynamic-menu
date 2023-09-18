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

function logger(reducer: ActionReducer<AppState>):ActionReducer<AppState> {
   return function (state,action) {
     const res = reducer(state, action)
     console.log("latest state", res)
     console.log("state", state)
     console.log("action", action)
     return res;
   }
}
export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];
