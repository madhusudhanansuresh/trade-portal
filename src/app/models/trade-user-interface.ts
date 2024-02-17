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
  