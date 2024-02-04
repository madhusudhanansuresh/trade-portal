import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class ProgressService {

    constructor() { }
    private isLoadingQueue: string[] = []
    private isNavigatingQueue: string[] = []

    isLoading$ = new BehaviorSubject<boolean>(false);
    isNavigating$ = new BehaviorSubject<boolean>(false);

    showProgressSpinner(): void {
        this.isLoadingQueue.push('');
        this.isLoading$.next(this.isLoadingQueue.length > 0);
    }

    hideProgressSpinner(): void {
        this.isLoadingQueue.pop();
        this.isLoading$.next(this.isLoadingQueue.length > 0);
    }

    showNavSpinner(): void {
        this.isNavigatingQueue.push('');
        this.isLoading$.next(this.isLoadingQueue.length > 0);
    }

    hideNavSpinner(): void {
        this.isNavigatingQueue.pop();
        this.isLoading$.next(this.isLoadingQueue.length > 0);
    }
    
}