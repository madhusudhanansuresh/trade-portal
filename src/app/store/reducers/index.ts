import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from "@ngrx/store";
import * as fromTrade from "./trade-user.reducer";
import { environment } from "../../../environments/environment";

export interface TradeAppFeatureState {
  tradeUser: fromTrade.TradeUserState;
}

export const tradeReducers: ActionReducerMap<TradeAppFeatureState> = {
    tradeUser: fromTrade.reducer,
};

export const getTradeAppFeatureState =
  createFeatureSelector<TradeAppFeatureState>("tradeAppFeatureState");

export const tradeMetaReducers: MetaReducer<TradeAppFeatureState>[] =
  !environment.production ? [] : [];

export interface State {}
export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = [];
