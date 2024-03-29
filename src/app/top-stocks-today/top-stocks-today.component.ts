import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../src/app/store";
import { Observable, Subscription, forkJoin } from "rxjs";
import { filter, map, take } from "rxjs/operators"; // Corrected import for 'map'
import { MarketStatistics } from "../models/trade-user-interface"; // Adjust the path as needed
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ReasonDialogComponent } from "../reason-dialog/reason-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-top-stocks-today",
  templateUrl: "./top-stocks-today.component.html",
  styleUrls: ["./top-stocks-today.component.scss"], // Corrected property name and array syntax
})
export class TopStocksTodayComponent implements OnInit, AfterViewInit {
  private subscription: Subscription = new Subscription();
  getStockDataStatus$!: Observable<boolean>;
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

  marketStatistics$!: Observable<MarketStatistics[]>;
  filterStates = {
    ticker: "",
    price: "",
    m15rv: "",
    m15rs: "",
    m30rv: "",
    m30rs: ""
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
      this.marketStatistics$.subscribe((data) => {
        this.dataSource.data = data;
        if (data && data.length > 0) {
          this.firstTimestamp = data[0].timeStamp;
        }
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
          return item.fifteenMin?.rvol;
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
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      // Check ticker filter
      if (
        this.filterStates.ticker &&
        !data.ticker
          .toLowerCase()
          .includes(this.filterStates.ticker.toLowerCase())
      ) {
        return false;
      }

      // Check price filter
      if (this.filterStates.price) {
        const [, value] = this.filterStates.price.split(":");
        const priceValue = parseFloat(value);
        if (!(data.price > priceValue)) {
          return false;
        }
      }

      // Check rv filter
      if (this.filterStates.m30rv) {
        const [, value] = this.filterStates.m30rv.split(":");
        const rvValue = parseFloat(value);
        if (!(data.thirtyMin.rvol > rvValue)) {
          return false;
        }
      }

      // Check rs filter
      if (this.filterStates.m30rs) {
        const [, condition] = this.filterStates.m30rs.split(":");
        const operator = condition[0];
        const rsValue = parseFloat(condition.substring(1));

        // Apply greater than filter
        if (operator === ">" && !(data.thirtyMin.rsrw > rsValue)) {
          return false;
        }
        // Apply less than filter
        else if (operator === "<" && !(data.thirtyMin.rsrw < rsValue)) {
          return false;
        }
      }

      // Check rv filter
      if (this.filterStates.m15rv) {
        const [, value] = this.filterStates.m15rv.split(":");
        const rvValue = parseFloat(value);
        if (!(data.fifteenMin.rvol > rvValue)) {
          return false;
        }
      }

      // Check rs filter
      if (this.filterStates.m15rs) {
        const [, condition] = this.filterStates.m15rs.split(":");
        const operator = condition[0];
        const rsValue = parseFloat(condition.substring(1));

        // Apply greater than filter
        if (operator === ">" && !(data.fifteenMin.rsrw > rsValue)) {
          return false;
        }
        // Apply less than filter
        else if (operator === "<" && !(data.fifteenMin.rsrw < rsValue)) {
          return false;
        }
      }
      return true;
    };
  }

  priceFilters = [
    { value: "", viewValue: "" },
    { value: ">30", viewValue: ">30" },
    { value: ">50", viewValue: ">50" },
    { value: ">100", viewValue: ">100" },
  ];

  rvFilters = [
    { value: "", viewValue: "" },
    { value: ">150", viewValue: ">150" },
    { value: ">200", viewValue: ">200" },
    { value: ">300", viewValue: ">300" },
    { value: ">400", viewValue: ">400" },
  ];

  rsFilters = [
    { value: "", viewValue: "" },
    { value: ">0.50", viewValue: ">0.50" },
    { value: ">1.00", viewValue: ">1.00" },
    { value: ">2.00", viewValue: ">2.00" },
    { value: "<-0.50", viewValue: "<(0.50)" },
    { value: "<-1.00", viewValue: "<(1.00)" },
    { value: "<-2.00", viewValue: "<(2.00)" },
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filterStates.ticker = filterValue;
    this.applyFilters();
  }

  applyPriceFilter(filterValue: string) {
    if (filterValue === "") {
      this.filterStates.price = "";
    } else {
      const isNegative = filterValue.includes("(");
      let value = filterValue.substring(1);
      if (isNegative) {
        const match = value.match(/\d+/);
        value = match ? "-" + match[0] : "0";
      }
      this.filterStates.price = "price:" + value;
    }
    this.applyFilters();
  }

  apply30mRvFilter(filterValue: string) {
    if (filterValue === "") {
      this.filterStates.m30rv = "";
    } else {
      let value = filterValue.substring(1);
      this.filterStates.m30rv = "rv:" + value;
    }
    this.applyFilters();
  }

  apply30mRsFilter(filterValue: string) {
    if (filterValue === "") {
      this.filterStates.m30rs = "";
    } else {
      this.filterStates.m30rs = filterValue ? "rs:" + filterValue : "";
      console.log(this.filterStates.m30rs);
    }
    this.applyFilters();
  }

  apply15mRvFilter(filterValue: string) {
    if (filterValue === "") {
      this.filterStates.m15rv = "";
    } else {
      let value = filterValue.substring(1);
      this.filterStates.m15rv = "rv:" + value;
    }
    this.applyFilters();
  }

  apply15mRsFilter(filterValue: string) {
    if (filterValue === "") {
      this.filterStates.m15rs = "";
    } else {
      this.filterStates.m15rs = filterValue ? "rs:" + filterValue : "";
      console.log(this.filterStates.m15rs);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.dataSource.filter = Math.random().toString();
  }

  openDialog(ticker: string): void {
    const dialogRef = this.dialog.open(ReasonDialogComponent, {
      width: "400px",
      height: "250px",
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const payload = {
          tickerName: ticker,
          reason: result,
          action: "add",
        };
        this.store.dispatch(fromRoot.addOrRemoveWatchlistItem({ payload }));
      }
    });
  }

  getRvolDisplayValue(rvol: number | null | undefined): {
    display: string;
    isValid: boolean;
  } {
    if (rvol === null || rvol === undefined) {
      return { display: "NA", isValid: false };
    } else {
      return { display: rvol.toFixed(2), isValid: true }; // Adjust decimal places as needed
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
