import { Component } from '@angular/core';
import {query_role_id} from "./store/actions/menu.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamic-menu-angular';
  roleId: string = "";
  roles: string[] = ["1","2","3","4","5"];

  constructor(private store: Store) {
  }

  query(){
    if (this.roleId !== "") {
      this.store.dispatch(query_role_id({id:this.roleId}))
    }
  }
}




