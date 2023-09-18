import { Component } from '@angular/core';
import {query_role_id} from "./store/actions/menu.actions";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Menu} from "./store/reducers/menu.reducer";
import {selectMenus} from "./store/selectors/menu.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-menu-angular';
  roleId: string = "";
  roles: string[] = ["1","2","3","4","5"];
  menus: Observable<Menu[]>
  selectedPage: string;

  constructor(private store: Store) {
    this.menus = this.store.pipe(select(selectMenus))
  }

  query(){
    if (this.roleId !== "") {
      this.store.dispatch(query_role_id({id:this.roleId}))
    }
  }
}




