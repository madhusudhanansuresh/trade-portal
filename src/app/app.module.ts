import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppProgressSpinnerComponent } from './app-progress-spinner/app-progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects, reducers, tradeMetaReducers, tradeReducers } from './store';
import { httpInterceptorProviders } from './http-interceptors';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TopStocksTodayComponent } from './top-stocks-today/top-stocks-today.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AuthInterceptorService } from './http-interceptors/AuthInterceptorService';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MarketStatisticsComponent } from './market-statistics/market-statistics.component';
import { TopLongsTodayComponent } from './top-longs-today/top-longs-today.component';
import { TopShortsTodayComponent } from './top-shorts-today/top-shorts-today.component';
import { ReasonDialogComponent } from './reason-dialog/reason-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyWatchlistComponent } from './my-watchlist/my-watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    AppProgressSpinnerComponent,
    TopStocksTodayComponent,
    MarketStatisticsComponent,
    TopLongsTodayComponent,
    TopShortsTodayComponent,
    ReasonDialogComponent,
    MyWatchlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    StoreModule.forFeature('tradeAppFeatureState', tradeReducers, { metaReducers: tradeMetaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [httpInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
