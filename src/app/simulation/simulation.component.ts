import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import * as fromRoot from "../../../src/app/store";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-simulation",
  templateUrl: "./simulation.component.html",
  styleUrl: "./simulation.component.scss",
})
export class SimulationComponent {
  dateRangeForm = this.fb.group({
    startDate: [null],
    endDate: [null],
  });

  dateTimeForm = this.fb.group({
    selectedDate: [null],
    selectedTime: [null],
  });

  constructor(private store: Store<any>, private fb: FormBuilder) {}

  submit() {
    const symbols: string[] = [];
    const intervals = ["15min"];

    const startDateString = this.dateRangeForm.value.startDate;
    const endDateString = this.dateRangeForm.value.endDate;

    let startDateEST: string | undefined;
    let endDateEST: string | undefined;

    if (startDateString) {
      const startDate = new Date(startDateString);
      startDateEST = this.adjustDateToEST(startDate, true);
      console.log("Start Date in EST:", startDateEST);
    } else {
      console.log("Start Date is not provided or invalid.");
    }

    if (endDateString) {
      const endDate = new Date(endDateString);
      endDateEST = this.adjustDateToEST(endDate, false);
      console.log("End Date in EST:", endDateEST);
    } else {
      console.log("End Date is not provided or invalid.");
    }

    const payload = {
      Symbols: symbols,
      Intervals: intervals,
      StartDate: startDateEST,
      EndDate: endDateEST,
    };

    this.store.dispatch(fromRoot.importMarketData({ payload }));
  }

  endDateFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d ? d <= today : false;
  };

  submitDateTime() {
    console.log("Date and Time Form Values:", this.dateTimeForm.value);
  }

  adjustDateToEST(date: Date, isStartDate: boolean): string {
    let adjustedDate = new Date(date.getTime());

    if (isStartDate) {
      adjustedDate.setHours(9, 30, 0, 0);
    } else {
      adjustedDate.setHours(16, 0, 0, 0);
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/New_York",
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(adjustedDate);

    const partToObject = parts.reduce((obj, part) => {
      obj[part.type] = part.value;
      return obj;
    }, {} as { [key: string]: string });

    const formattedDate = `${partToObject["year"]}-${partToObject["month"]}-${partToObject["day"]} ${partToObject["hour"]}:${partToObject["minute"]}:${partToObject["second"]}`;

    return formattedDate;
  }
}
