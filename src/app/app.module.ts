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

@NgModule({
  declarations: [
    AppComponent,
    AppProgressSpinnerComponent,
    TopStocksTodayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
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
