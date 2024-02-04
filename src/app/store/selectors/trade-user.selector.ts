import { createSelector } from "@ngrx/store";
import * as fromReducers from '../reducers';

export const getAssessmentState = createSelector(
    fromReducers.getTradeAppFeatureState,
    (state: fromReducers.TradeAppFeatureState) => state?.tradeUser
)

// export const searchAllTags = createSelector(getAssessmentState, state => state?.tags);




