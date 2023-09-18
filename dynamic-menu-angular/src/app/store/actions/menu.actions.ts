import { createAction, props } from '@ngrx/store';

// query role id list
export const query_role_id = createAction("queryRoleId", props<{id:string}>());

// update menu as the role id changes
export const updateMenu = createAction("updateMenu")
