import { createReducer, on } from '@ngrx/store';

export const menuFeatureKey = 'menu';

export interface Menu {
  main: string,
  subs: string[]
}

export interface State {
  menus: Menu[]
}

export const initialState: State = {
  menus: []
};

export const reducer = createReducer(
  initialState,
);

