import { createSelector } from "@ngrx/store";
import * as fromReducers from '../reducers';

export const getTradeState = createSelector(
    fromReducers.getTradeAppFeatureState,
    (state: fromReducers.TradeAppFeatureState) => state?.tradeUser
)

export const getStockData = createSelector(getTradeState, state => state?.marketStatistics);

export const getWatchlist = createSelector(getTradeState, state => state?.watchlistResponse);

export const getStockDataStatus = createSelector(getTradeState, state => state?.searchStockDataSuccess);




