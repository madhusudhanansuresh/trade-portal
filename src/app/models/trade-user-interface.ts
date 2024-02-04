export interface MarketStatisticsResponse {
    Value: Value;
    Formatters: any[];
    ContentTypes: any[];
    DeclaredType: any;
    StatusCode: number;
  }
  
  export interface Value {
    ListMarketStatistics: MarketStatistics[];
  }
  
  export interface MarketStatistics {
    Ticker: string;
    ATR: number;
    FiveMin: TimeframeStatistic;
    TenMin: TimeframeStatistic;
    FifteenMin: TimeframeStatistic;
    TwentyMin: TimeframeStatistic;
    TwentyFiveMin: TimeframeStatistic;
    ThirtyMin: TimeframeStatistic;
    FortyFiveMin: TimeframeStatistic;
    OneHour: TimeframeStatistic;
    TwoHour: TimeframeStatistic;
    ThreeHour: TimeframeStatistic | null;
    FourHour: TimeframeStatistic | null;
    FiveHour: TimeframeStatistic | null;
    SixHour: TimeframeStatistic | null;
    SevenHour: TimeframeStatistic | null;
  }
  
  export interface TimeframeStatistic {
    Rvol: number;
    RsRw: number | null;
  }
  