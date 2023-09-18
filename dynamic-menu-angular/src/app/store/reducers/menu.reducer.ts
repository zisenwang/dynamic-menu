import { createReducer, on } from '@ngrx/store';
import {update_menu} from "../actions/menu.actions";
import * as table from "src/assets/table.json"

export const menuFeatureKey = 'menu';

interface Table {
  [key: string]:{
    [key: string]: {
      system?: string;
      permission: string[];
    }
  }
}

export interface Menu {
  main: string,
  subs: string[]
}

export interface RoleInfo {
  id: number,
  permissionList: string[],
  systemStatus: {
    [key:string]: boolean
  }
}

export interface State {
  menus: Menu[],
  data: Object
}

export const initialState: State = {
  menus: [],
  data: {},
};

export const reducer = createReducer(
  initialState,
  on(update_menu, (state,action) => ({
    ...state,
    menus:resolvePermission(action.data),
    data: action.data
  }))
);

const rules:Table = table;  // rule table

/**
 * handle permission selection
 * @param data
 */
const resolvePermission = (data:RoleInfo) => {
  let temp = deriveMenu(data)
  for (let i = temp.length-1 ; i >= 0 ; i--){
    if (temp[i].subs.length === 0) {
      // delete elements with 0 subs
      temp.splice(i,1)
    }

  }
  return temp
}
/**
 * derive menu result with given rules and return the permitted menus
 * @param data role data
 */
const deriveMenu = (data: RoleInfo) => {
  const res:Menu[] = []
  for (let menu in rules){
    if (menu !== "default") checkAndUpdateLegalSub(res,menu,data);
  }
  return res;
}

/**
 * the inner loop of deriveMenu, check each menu option
 * @param res res
 * @param menu menu entry
 * @param data role data
 */
const checkAndUpdateLegalSub = (res: Menu[],menu: string,data: RoleInfo) => {
  const menuInstance: Menu = {main: "", subs: []};
  menuInstance.main = menu;
  let inner = rules[menu];
  for (let sub in inner){
    // if system control is false, check the next available submenu
    if (inner[sub].system && !data.systemStatus[inner[sub].system!]){
      continue;
    }
    // check permission
    if (data.permissionList.includes(inner[sub].permission[0])){
      menuInstance.subs.push(sub);
    }
  }
  res.push(menuInstance)
}
