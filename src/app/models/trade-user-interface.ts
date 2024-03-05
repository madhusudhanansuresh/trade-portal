export interface MarketStatisticsResponse {
  listMarketStatistics: MarketStatistics[];
  success: boolean;
  }
  
  export interface Value {
    listMarketStatistics: MarketStatistics[];
  }
  
  export interface MarketStatistics {
    ticker: string;
    atr: number;
    price: number;
    fiveMin: TimeframeStatistic;
    tenMin: TimeframeStatistic;
    fifteenMin: TimeframeStatistic;
    thirtyMin: TimeframeStatistic;
    oneHour: TimeframeStatistic;
    twoHour: TimeframeStatistic;
    fourHour: TimeframeStatistic | null;
    timeStamp: Date;
  }
  
  export interface TimeframeStatistic {
    rvol: number;
    rsrw: number;
  }
  

  export interface AddOrRemoveWatchlist {
    success: boolean;
    message: string;
  }

  export interface WatchlistResponse {
    watchlist: Watchlist[];
    success: boolean;
    message: string;
  }

  export interface Watchlist {
    tickerName: string,
    reason: string,
    lastUpdated: string
  }

  export interface ImportMarketData {
    success: boolean;
    message: string;
  }