import { createSelector } from "@ngrx/store";
import * as fromReducers from '../reducers';

export const getTradeState = createSelector(
    fromReducers.getTradeAppFeatureState,
    (state: fromReducers.TradeAppFeatureState) => state?.tradeUser
)

export const getStockData = createSelector(getTradeState, state => state?.marketStatistics);




