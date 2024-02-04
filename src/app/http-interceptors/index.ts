import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { SpinnerInterceptor } from "./spinner-interceptor"

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
]