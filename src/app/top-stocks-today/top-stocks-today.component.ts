import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../src/app/store'

@Component({
  selector: "app-top-stocks-today",
  templateUrl: "./top-stocks-today.component.html",
  styleUrl: "./top-stocks-today.component.scss",
})
export class TopStocksTodayComponent implements OnInit {  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fromRoot.searchStockData({payload: {}}))
  }
}
