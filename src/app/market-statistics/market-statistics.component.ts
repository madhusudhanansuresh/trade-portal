import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../../src/app/store"; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-market-statistics',
  templateUrl: './market-statistics.component.html',
  styleUrl: './market-statistics.component.scss'
})
export class MarketStatisticsComponent {

  getStockDataStatus$!: Observable<boolean>;

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromRoot.searchStockData({ payload: {} }));
    this.store.dispatch(fromRoot.searchWatchlist({ payload: {} }));
    this.getStockDataStatus$  = this.store.select(fromRoot.getStockDataStatus);
  }

}
