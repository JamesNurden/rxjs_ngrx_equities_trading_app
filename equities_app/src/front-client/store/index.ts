// store/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { TradingState } from '../state/trading.state';
import { tradingReducer } from '../state/trading.reducer';

export interface AppState {
  trading: TradingState;
}

export const reducers: ActionReducerMap<AppState> = {
  trading: tradingReducer
};

// store/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { TradingState } from '../state/trading.state';
import { tradingReducer } from '../state/trading.reducer';

export interface AppState {
  trading: TradingState;
}

export const reducers: ActionReducerMap<AppState> = {
  trading: tradingReducer
};
