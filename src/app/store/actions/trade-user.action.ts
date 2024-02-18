import { createAction, props } from "@ngrx/store";
import { AddOrRemoveWatchlist, MarketStatisticsResponse, WatchlistResponse } from "../../models/trade-user-interface";
import { Observable } from "rxjs";

export const searchStockData = createAction(
    '[trade-user] Search Stock Data',
    props<{ payload: any }>()
);

export const searchStockDataSuccess = createAction(
    '[trade-user] Search Stock Data Success',
    props<{ marketStatistics: MarketStatisticsResponse }>()
);

export const searchStockDataFail = createAction(
    '[trade-user] Search Stock Data Fail',
    props<{ error: any }>()
);

export const addOrRemoveWatchlistItem = createAction(
    '[trade-user] Add or Remove Watchlist Item',
    props<{ payload: any }>()
);

export const addOrRemoveWatchlistSuccess = createAction(
    '[trade-user] Add or Remove Watchlist Item Success',
    props<{ addOrRemoveWatchlist: AddOrRemoveWatchlist }>()
);

export const addOrRemoveWatchlistFail = createAction(
    '[trade-user] Add or Remove Watchlist Item Fail',
    props<{ error: any }>()
);

export const searchWatchlist = createAction(
    '[trade-user] Search Watchlist',
    props<{ payload: any }>()
);

export const searchWatchlistSuccess = createAction(
    '[trade-user] Search Watchlist Success',
    props<{ watchlistResponse: WatchlistResponse }>()
);

export const searchWatchlistFail = createAction(
    '[trade-user] Search Watchlist Fail',
    props<{ error: any }>()
);
    
    