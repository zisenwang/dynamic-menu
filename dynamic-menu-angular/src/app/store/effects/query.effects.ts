import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {query_role_id, update_menu} from "../actions/menu.actions";
import {HttpClient} from "@angular/common/http";
import {switchMap, map, filter} from "rxjs";
import {RoleInfo} from "../reducers/menu.reducer";


@Injectable()
export class QueryEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  url: string = "https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters/"

  query_role_id_effect = createEffect(() =>
      this.actions$.pipe(
        ofType(query_role_id),  // check if the action is query role id
        switchMap((action) =>  // go to the next observable
          this.http.get(this.url + action.id).pipe(  // send request
            map((data) => update_menu({data:data})) // go to the next action after return
          )
        )
      )
  );
}
