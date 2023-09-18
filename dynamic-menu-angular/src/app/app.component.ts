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

  constructor(private store: Store) {
  }

  query(){
    this.store.dispatch(query_role_id({id:"1"}))
  }
}




