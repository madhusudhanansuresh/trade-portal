import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../src/app/store"; // Make sure the path is correct
import { Observable } from "rxjs";
import { map } from "rxjs/operators"; // Corrected import for 'map'
import { MarketStatistics } from "../models/trade-user-interface"; // Adjust the path as needed
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-top-stocks-today",
  templateUrl: "./top-stocks-today.component.html",
  styleUrls: ["./top-stocks-today.component.scss"], // Corrected property name and array syntax
})
export class TopStocksTodayComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<MarketStatistics>;
  public firstTimestamp: Date | null = null;
  displayedColumns: string[] = [
    "ticker",
    "price",
    "atr",
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

  constructor(private store: Store<any>) {
    // Consider replacing any with your AppState interface
    this.dataSource = new MatTableDataSource<MarketStatistics>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.store.dispatch(fromRoot.searchStockData({ payload: {} }));

    this.marketStatistics$ = this.store
      .select(fromRoot.getStockData)
      .pipe(map((data) => data?.listMarketStatistics || []));

    this.marketStatistics$.subscribe((data) => {
      this.dataSource.data = data;
      if (data && data.length > 0) {
        this.firstTimestamp = data[0].timeStamp;
      }
    });

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
      if (this.filterStates.rv) {
        const [, value] = this.filterStates.rv.split(":");
        const rvValue = parseFloat(value);
        if (!(data.thirtyMin.rvol > rvValue)) {
          return false;
        }
      }

      // Check rs filter
      if (this.filterStates.rs) {
        const [, condition] = this.filterStates.rs.split(":");
        const match = condition.match(/([<>])(\d+)/);
        if (match) {
            const operator = match[1];
            const rsValue = parseFloat(match[2]);
            
            if (operator === '>' && data.thirtyMin.rsrw <= rsValue) {
                return false;
            } else if (operator === '<' && data.thirtyMin.rsrw >= rsValue) {
                return false;
            }
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
  ];

  rsFilters = [
    { value: "", viewValue: "" },
    { value: ">100", viewValue: ">100" },
    { value: ">200", viewValue: ">200" },
    { value: "<(100)", viewValue: "<(100)" },
    { value: "<(200)", viewValue: "<(200)" },
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
      this.filterStates.rv = "";
    } else {
      const isNegative = filterValue.includes("(");
      let value = filterValue.substring(1);
      if (isNegative) {
        const match = value.match(/\d+/);
        value = match ? "-" + match[0] : "0";
      }
      this.filterStates.rv = "rv:" + value;
    }
    this.applyFilters();
  }

  apply30mRsFilter(filterValue: string) {
    if (filterValue === "") {
        this.filterStates.rs = "";
    } else {
        let operator = filterValue[0];
        let value = filterValue.substring(1);
        
        if (operator === "(" && filterValue.endsWith(")")) {
            // Interpret parentheses as less than
            operator = "<";
            const match = value.match(/\d+/);
            value = match ? match[0] : "0"; // Extract number without parentheses
        } else if (operator !== ">") {
            // Default to greater than if no valid operator is found
            operator = ">";
            value = filterValue; // Use the original value as it might not have an operator
        }
        
        this.filterStates.rs = "rs:" + operator + value;
    }
    this.applyFilters();
}

  applyFilters() {
    this.dataSource.filter = Math.random().toString(); // Trigger filterPredicate with a dummy value
  }
}
