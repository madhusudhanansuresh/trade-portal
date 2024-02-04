import { createAction, props } from "@ngrx/store";
import { MarketStatisticsResponse } from "../../models/trade-user-interface";
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
    