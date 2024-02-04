import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, JsonpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { ProgressService } from "../services/progress.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private progressService: ProgressService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressService.showProgressSpinner();

        return next.handle(req).pipe(
            finalize(() => {
                this.progressService.hideProgressSpinner();
            })
        )
    }
}