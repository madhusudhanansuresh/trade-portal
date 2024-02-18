import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromRoot from "../../../../src/app/store";
import * as actions from '../actions';
import { TradeUserService } from "../../services/trade-user-service";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Store } from "@ngrx/store";


@Injectable()
export class TradeEffects {

    constructor(
        private action$: Actions,
        private tradeUserService: TradeUserService,
        private store: Store
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

    addOrRemoveWatchlistItem$ = createEffect(() => this.action$.pipe(
        ofType(actions.addOrRemoveWatchlistItem),
        switchMap((action) => this.tradeUserService.addOrRemoveWatchlistItem(action.payload).pipe(
            map(res => {
                return actions.addOrRemoveWatchlistSuccess({ addOrRemoveWatchlist: res })
            }),
            tap(() => {
                this.store.dispatch(fromRoot.searchWatchlist({ payload: {} }));
            }),
            catchError((error: any) => {
                return of(actions.addOrRemoveWatchlistFail({ error }))
            })
        ))
    ));

    searchWatchlist$ = createEffect(() => this.action$.pipe(
        ofType(actions.searchWatchlist),
        switchMap((action) => this.tradeUserService.searchWatchlist().pipe(
            map(res => {
                return actions.searchWatchlistSuccess({ watchlistResponse: res })
            }),
            catchError((error: any) => {
                return of(actions.searchWatchlistFail({ error }))
            })
        ))
    ));
}