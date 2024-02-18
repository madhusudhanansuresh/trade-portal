import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../src/app/store";
import { Observable, Subscription, combineLatest, forkJoin } from "rxjs";
import { map } from "rxjs/operators"; // Corrected import for 'map'
import {
  MarketStatistics,
  Watchlist,
  WatchlistResponse,
} from "../models/trade-user-interface"; // Adjust the path as needed
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-my-watchlist",
  templateUrl: "./my-watchlist.component.html",
  styleUrl: "./my-watchlist.component.scss",
})
export class MyWatchlistComponent implements OnInit, AfterViewInit {
  private subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<MarketStatistics>;
  public firstTimestamp: Date | null = null;
  displayedColumns: string[] = [
    "ticker",
    "price",
    "fifteenMinRvol",
    "fifteenMinRsRw",
    "thirtyMinRvol",
    "thirtyMinRsRw",
    "oneHourRvol",
    "oneHourRsRw",
    "twoHourRvol",
    "twoHourRsRw",
    "fourHourRvol",
    "fourHourRsRw",
    "reason",
    "action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  marketStatistics$!: Observable<MarketStatistics[]>; // Removed unnecessary non-null assertion (!)
  watchlist$!: Observable<Watchlist[]>;

  filterStates = {
    ticker: "",
    price: "",
    rv: "",
    rs: "",
  };

  constructor(private store: Store<any>) {
    this.dataSource = new MatTableDataSource<MarketStatistics>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.marketStatistics$ = this.store
      .select(fromRoot.getStockData)
      .pipe(map((data) => data?.listMarketStatistics || []));

    this.watchlist$ = this.store
      .select(fromRoot.getWatchlist)
      .pipe(map((data) => data?.watchlist || []));

    this.subscription.add(
      combineLatest([this.marketStatistics$, this.watchlist$])
        .pipe(
          map(([marketStatistics, watchlist]) => {
            // First, filter marketStatistics to only include items present in the watchlist
            const filteredStatistics = marketStatistics.filter((statistic) =>
              watchlist.some(
                (watchlistItem) => watchlistItem.tickerName === statistic.ticker
              )
            );

            // Then, enhance the filtered market statistics with additional data from the watchlist
            return filteredStatistics.map((statistic) => {
              const watchlistItem = watchlist.find(
                (watchlistItem) => watchlistItem.tickerName === statistic.ticker
              );
              return {
                ...statistic,
                lastUpdated: watchlistItem?.lastUpdated,
                reason: watchlistItem?.reason,
              };
            });
          })
        )
        .subscribe((filteredAndEnhancedData) => {
          this.dataSource.data = filteredAndEnhancedData;
          if (filteredAndEnhancedData && filteredAndEnhancedData.length > 0) {
            this.firstTimestamp = filteredAndEnhancedData[0].timeStamp;
          }
        })
    );

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "fifteenMinRvol":
          return item.fifteenMin.rvol;
        case "fifteenMinRsRw":
          return item.fifteenMin.rsrw;
        case "thirtyMinRvol":
          return item.thirtyMin.rvol;
        case "thirtyMinRsRw":
          return item.thirtyMin.rsrw;
        case "oneHourRvol":
          return item.oneHour.rvol;
        case "oneHourRsRw":
          return item.oneHour.rsrw;
        case "twoHourRvol":
          return item.twoHour.rvol;
        case "twoHourRsRw":
          return item.twoHour.rsrw;
        case "fourHourRvol":
          return item.fourHour?.rvol; // Use optional chaining for nullable properties
        case "fourHourRsRw":
          return item.fourHour?.rsrw;
        default:
          return (item as any)[property];
      }
    };
  }

  remove(ticker: string): void {
    const payload = {
      tickerName: ticker,
      action: 'remove'
    }
    this.store.dispatch(fromRoot.addOrRemoveWatchlistItem({payload}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
