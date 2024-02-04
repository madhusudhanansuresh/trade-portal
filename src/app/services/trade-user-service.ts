import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MarketStatisticsResponse } from "../models/trade-user-interface";
import { environment } from "../../environments/environment";


//const Assessment_API = environment.assessmentApiUrl;

@Injectable({ providedIn: 'root' })
export class TradeUserService {

    private readonly baseUrl: string = environment.tradeApiUrl;

    constructor(private http: HttpClient) {
     }

    searchUsers(): Observable<MarketStatisticsResponse> {
        const request = {
        }
        return this.http.post<any>(`${this.baseUrl}/api/marketStatistics`, request);
    }
}
