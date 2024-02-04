import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from '../actions';
import { TradeUserService } from "../../services/trade-user-service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap } from "rxjs";


@Injectable()
export class TradeEffects {

    constructor(
        private action$: Actions,
        private tradeUserService: TradeUserService,
        private store: Store,
        private router: Router,
    ) {
    }

    searchStockData$ = createEffect(() => this.action$.pipe(
        ofType(actions.searchStockData),
        switchMap((action) => this.tradeUserService.searchUsers().pipe(
            map(res => {
                return actions.searchStockDataSuccess({ marketStatistics: res })
            }),
            catchError((error: any) => {
                return of(actions.searchStockDataFail({ error }))
            })
        ))
    ));
}