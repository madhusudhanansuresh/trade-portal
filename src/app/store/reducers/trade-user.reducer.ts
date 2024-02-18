import { Action, createReducer, on } from "@ngrx/store";
import * as Actions from "../actions";
import { MarketStatisticsResponse, WatchlistResponse } from "../../models/trade-user-interface";

export interface TradeUserState {
  marketStatistics: MarketStatisticsResponse | null;
  watchlistResponse: WatchlistResponse | null;
  searchStockDataSuccess: boolean;
  searchWatchlistSuccess: boolean;
}

const initialState: TradeUserState = {
  marketStatistics: null,
  watchlistResponse: null,
  searchStockDataSuccess: false,
  searchWatchlistSuccess: false,
};

const tradeUserReducer = createReducer(
  initialState,
  on(Actions.searchStockData, (state) => ({
    ...state,
    searchStockDataSuccess: false,
  })),
  on(Actions.searchStockDataSuccess, (state, { marketStatistics }) => ({
    ...state,
    marketStatistics,
    searchStockDataSuccess: true,
  })),
  on(Actions.searchWatchlist, (state) => ({
    ...state,
    searchWatchlistSuccess: false,
  })),
  on(Actions.searchWatchlistSuccess, (state, { watchlistResponse }) => ({
    ...state,
    watchlistResponse,
    searchWatchlistSuccess: true,
  }))
);

export function reducer(
  state: TradeUserState | undefined,
  action: Action
): TradeUserState {
  return tradeUserReducer(state, action);
}
