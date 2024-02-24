import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddOrRemoveWatchlist, MarketStatisticsResponse, WatchlistResponse } from "../models/trade-user-interface";
import { environment } from "../../environments/environment";


//const Assessment_API = environment.assessmentApiUrl;

@Injectable({ providedIn: 'root' })
export class TradeUserService {

    private readonly baseUrl: string = environment.tradeApiUrl;

    constructor(private http: HttpClient) {
     }

    searchMarketData(payload: any): Observable<MarketStatisticsResponse> {
        const request = {
            ...payload
        }
        return this.http.post<any>(`${this.baseUrl}/api/marketStatistics`, request);
    }

    addOrRemoveWatchlistItem(payload: any): Observable<AddOrRemoveWatchlist> {
        const request = {
            ...payload
        }
        console.log(request);
        return this.http.post<any>(`${this.baseUrl}/api/addOrRemoveWatchlist`, request);
    }

    searchWatchlist(): Observable<WatchlistResponse> {
        const request = {
        }
        return this.http.post<any>(`${this.baseUrl}/api/listWatchlist`, request);
    }

    importMarketData(payload: any): Observable<AddOrRemoveWatchlist> {
        const request = {
            ...payload
        }
        console.log(request);
        return this.http.post<any>(`${this.baseUrl}/api/importAdhocMarketData`, request);
    }
}
