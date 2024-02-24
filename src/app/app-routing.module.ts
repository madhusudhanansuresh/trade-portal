import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketStatisticsComponent } from './market-statistics/market-statistics.component';
import { SimulationComponent } from './simulation/simulation.component';
import { RealtimeComponent } from './realtime/realtime.component';

const routes: Routes = [
  { path: '', component: RealtimeComponent },
  { path: 'realtime', component: RealtimeComponent },
  { path: 'simulation', component: SimulationComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
