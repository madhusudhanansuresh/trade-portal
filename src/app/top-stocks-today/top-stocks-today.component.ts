import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../src/app/store'; // Make sure the path is correct
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Corrected import for 'map'
import { MarketStatistics } from '../models/trade-user-interface'; // Adjust the path as needed
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-top-stocks-today',
  templateUrl: './top-stocks-today.component.html',
  styleUrls: ['./top-stocks-today.component.scss'], // Corrected property name and array syntax
})
export class TopStocksTodayComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<MarketStatistics>;
  public firstTimestamp: Date | null = null; 
  displayedColumns: string[] = [
    'ticker', 'price', 'atr',
    'fifteenMinRvol', 'fifteenMinRsRw', 
    'thirtyMinRvol', 'thirtyMinRsRw',
    'oneHourRvol', 'oneHourRsRw',
    'twoHourRvol', 'twoHourRsRw',
    'fourHourRvol', 'fourHourRsRw'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  marketStatistics$!: Observable<MarketStatistics[]>; // Removed unnecessary non-null assertion (!)

  constructor(private store: Store<any>) { // Consider replacing any with your AppState interface
    this.dataSource = new MatTableDataSource<MarketStatistics>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.store.dispatch(fromRoot.searchStockData({ payload: {} }));

    this.marketStatistics$ = this.store.select(fromRoot.getStockData).pipe(
      map(data => data?.listMarketStatistics || [])
    );

    this.marketStatistics$.subscribe(data => {
      this.dataSource.data = data;    
      if (data && data.length > 0) {
        this.firstTimestamp = data[0].timeStamp;
      }
    });

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'fifteenMinRvol': return item.fifteenMin.rvol;
        case 'fifteenMinRsRw': return item.fifteenMin.rsrw;
        case 'thirtyMinRvol': return item.thirtyMin.rvol;
        case 'thirtyMinRsRw': return item.thirtyMin.rsrw;
        case 'oneHourRvol': return item.oneHour.rvol;
        case 'oneHourRsRw': return item.oneHour.rsrw;
        case 'twoHourRvol': return item.twoHour.rvol;
        case 'twoHourRsRw': return item.twoHour.rsrw;
        case 'fourHourRvol': return item.fourHour?.rvol; // Use optional chaining for nullable properties
        case 'fourHourRsRw': return item.fourHour?.rsrw;
        default: return (item as any)[property];
      }
    };
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      if (!filter) return true;
    
      const [filterType, filterValue] = filter.split(':');
      const value = parseFloat(filterValue);
    
      switch (filterType) {
        case 'price':
          return data.price > value;
        case 'rv':
          return data.thirtyMin.rvol > value;
        // Add cases for other filter types as needed
        default:
          return true;
      }
    };
    
  }

  // applyFilter(event: Event) {
  //   console.log((event.target as HTMLInputElement).value);
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  priceFilters = [
    { value: '', viewValue: '' },
    {value: '>30', viewValue: '>30'},
    {value: '>50', viewValue: '>50'},
    {value: '>100', viewValue: '>100'},
  ];

  rvFilters = [
    { value: '', viewValue: '' },
    {value: '>150', viewValue: '>150'},
    {value: '>200', viewValue: '>200'},
    {value: '>300', viewValue: '>300'},
  ];

  rsFilters = [
    { value: '', viewValue: '' },
    {value: '>100', viewValue: '>100'},
    {value: '>200', viewValue: '>200'},
    {value: '>(100)', viewValue: '>(100)'},
    {value: '>(200)', viewValue: '>(200)'},
  ];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = 'ticker:' + filterValue;
  }
  
  applyPriceFilter(filterValue: string) {
    if (filterValue === '') {
      this.dataSource.filter = '';
    } else {
      const isNegative = filterValue.includes('(');
      let value = filterValue.substring(1);
      if (isNegative) {
        const match = value.match(/\d+/);
        value = match ? '-' + match[0] : '0'; // Use '0' or some other default value if no match
      }
      this.dataSource.filter = 'price:' + value;
    }
  }
  
  apply30mRvFilter(filterValue: string) {
    if (filterValue === '') {
      this.dataSource.filter = '';
    } else {
      const isNegative = filterValue.includes('(');
      let value = filterValue.substring(1);
      if (isNegative) {
        const match = value.match(/\d+/);
        value = match ? '-' + match[0] : '0'; // Use '0' or some other default value if no match
      }
      this.dataSource.filter = 'rv:' + value;
    }
  }  
}
