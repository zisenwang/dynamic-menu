import { createFeatureSelector, createSelector } from '@ngrx/store';
import { menuFeatureKey, State} from "../reducers/menu.reducer";

export const selectState = createFeatureSelector<State>(menuFeatureKey);
export const selectMenus = createSelector(selectState, state => state.menus);
