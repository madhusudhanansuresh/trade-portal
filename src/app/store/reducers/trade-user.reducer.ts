import { Action, createReducer, on } from "@ngrx/store";
import * as Actions from "../actions";
import { MarketStatisticsResponse } from "../../models/trade-user-interface";

export interface TradeUserState {
  marketStatistics: MarketStatisticsResponse | null;
  searchStockDataSuccess: boolean;
}

const initialState: TradeUserState = {
  marketStatistics: null,
  searchStockDataSuccess: false,
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
  }))
);

export function reducer(
  state: TradeUserState | undefined,
  action: Action
): TradeUserState {
  return tradeUserReducer(state, action);
}
