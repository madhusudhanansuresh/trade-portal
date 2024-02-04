import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopStocksTodayComponent } from './top-stocks-today/top-stocks-today.component';

const routes: Routes = [
  { path: '', component: TopStocksTodayComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
