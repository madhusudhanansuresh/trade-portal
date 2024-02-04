import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProgressService } from '../services/progress.service';


@Component({
  selector: 'app-app-progress-spinner',
  templateUrl: './app-progress-spinner.component.html',
  styleUrls: ['./app-progress-spinner.component.scss']
})
export class AppProgressSpinnerComponent implements OnInit {

  isLoading$: Observable<boolean> = of(false);
  isNavigating$: Observable<boolean> = of(false);

  constructor(private service: ProgressService) { }

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.isNavigating$ = this.service.isNavigating$
  }

}
