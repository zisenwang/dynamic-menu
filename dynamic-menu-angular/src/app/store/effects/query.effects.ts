import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {query_role_id} from "../actions/menu.actions";
import {HttpClient} from "@angular/common/http";
import {switchMap, map, tap} from "rxjs";


@Injectable()
export class QueryEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  url: string = "https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters/"

  query_role_id_effect = createEffect(() =>
      this.actions$.pipe(
        ofType(query_role_id),
        switchMap((action) =>
          this.http.get(this.url + action.id).pipe(
            tap((data) => console.log('返回的结果:', data)) // 在控制台上打印返回的结果
          )
        )
      )
  );
}
