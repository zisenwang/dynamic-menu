import { createAction, props } from '@ngrx/store';

// query role id list
export const query_role_id = createAction("query_role_id", props<{id:string}>());

// update menu as the role id changes
export const update_menu = createAction("update_menu", props<{data:any}>())

// select page
export const select_page = createAction("select_page", props<{selectedPage:string}>())
