import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../src/app/store'; // Make sure the path is correct
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Corrected import for 'map'
import { MarketStatistics } from '../models/trade-user-interface'; // Adjust the path as needed
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-top-stocks-today',
  templateUrl: './top-stocks-today.component.html',
  styleUrls: ['./top-stocks-today.component.scss'], // Corrected property name and array syntax
})
export class TopStocksTodayComponent implements OnInit {
  dataSource: MatTableDataSource<MarketStatistics>;
  displayedColumns: string[] = [
    'ticker', 'atr', 'price',
    'fifteenMinRvol', 'fifteenMinRsRw', 
    'thirtyMinRvol', 'thirtyMinRsRw',
    'oneHourRvol', 'oneHourRsRw',
    'twoHourRvol', 'twoHourRsRw',
    'fourHourRvol', 'fourHourRsRw'
  ];
  
  marketStatistics$!: Observable<MarketStatistics[]>; // Removed unnecessary non-null assertion (!)

  constructor(private store: Store<any>) { // Consider replacing any with your AppState interface
    this.dataSource = new MatTableDataSource<MarketStatistics>([]);
  }

  ngOnInit(): void {
    this.store.dispatch(fromRoot.searchStockData({ payload: {} }));

    this.marketStatistics$ = this.store.select(fromRoot.getStockData).pipe(
      map(data => data?.value?.listMarketStatistics || [])
    );

    // Subscribe to marketStatistics$ and update MatTableDataSource
    this.marketStatistics$.subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
