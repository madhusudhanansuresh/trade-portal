import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketStatisticsComponent } from './market-statistics/market-statistics.component';

const routes: Routes = [
  { path: '', component: MarketStatisticsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
