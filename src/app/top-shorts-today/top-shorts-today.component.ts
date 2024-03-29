import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../src/app/store";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators"; // Corrected import for 'map'
import { MarketStatistics } from "../models/trade-user-interface"; // Adjust the path as needed
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ReasonDialogComponent } from "../reason-dialog/reason-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-top-shorts-today",
  templateUrl: "./top-shorts-today.component.html",
  styleUrl: "./top-shorts-today.component.scss",
})
export class TopShortsTodayComponent implements OnInit, AfterViewInit {
  private subscription: Subscription = new Subscription();
  dataSource: MatTableDataSource<MarketStatistics>;
  public firstTimestamp: Date | null = null;
  displayedColumns: string[] = [
    "ticker",
    "price",
    "atr",
    // "fiveMinRvol",
    // "fiveMinRsRw",
    // "tenMinRvol",
    // "tenMinRsRw",
    "fifteenMinRvol",
    "fifteenMinRsRw",
    // "twentyMinRvol",
    // "twentyMinRsRw",
    // "twentyFiveMinRvol",
    // "twentyFiveMinRsRw",
    "thirtyMinRvol",
    "thirtyMinRsRw",
    "oneHourRvol",
    "oneHourRsRw",
    "twoHourRvol",
    "twoHourRsRw",
    "fourHourRvol",
    "fourHourRsRw",
    "action",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  marketStatistics$!: Observable<MarketStatistics[]>; // Removed unnecessary non-null assertion (!)
  filterStates = {
    ticker: "",
    price: "",
    rv: "",
    rs: "",
  };

  constructor(private store: Store<any>, public dialog: MatDialog) {
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

    this.subscription.add(
      this.marketStatistics$
        .pipe(
          map((data) =>
            data
              .filter(
                (statistic) =>
                  statistic.thirtyMin &&
                  statistic.thirtyMin?.rvol > 150 &&
                  statistic.thirtyMin?.rsrw < -0.5
              )
              .sort((a, b) => b.thirtyMin.rvol - a.thirtyMin.rvol)
          )
        )
        .subscribe((filteredData) => {
          this.dataSource.data = filteredData;
        })
    );

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "fiveMinRvol":
          return item.fiveMin?.rvol;
        case "fiveMinRsRw":
          return item.fiveMin?.rsrw;
        case "tenMinRvol":
          return item.tenMin?.rvol;
        case "tenMinRsRw":
          return item.tenMin?.rsrw;
        case "fifteenMinRvol":
          return item.fifteenMin.rvol;
        case "fifteenMinRsRw":
          return item.fifteenMin.rsrw;
        case "twentyMinRvol":
          return item.twentyMin?.rvol;
        case "twentyMinRsRw":
          return item.twentyMin?.rsrw;
        case "twentyFiveMinRvol":
          return item.twentyFiveMin?.rvol;
        case "twentyFiveMinRsRw":
          return item.twentyFiveMin?.rsrw;
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

  openDialog(ticker: string): void {
    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: "400px",
      height: "250px",
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Ensure result is not empty
        const payload = {
          tickerName: ticker,
          reason: result,
          action: "add",
        };
        this.store.dispatch(fromRoot.addOrRemoveWatchlistItem({ payload }));
      }
    });
  }

  getRvolDisplayValue(rvol: number | null | undefined): { display: string, isValid: boolean } {
    if (rvol === null || rvol === undefined) {
      return { display: 'NA', isValid: false };
    } else {
      return { display: rvol.toFixed(2), isValid: true }; // Adjust decimal places as needed
    }
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
