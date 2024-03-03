import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import * as fromRoot from "../../../src/app/store";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-simulation",
  templateUrl: "./simulation.component.html",
  styleUrl: "./simulation.component.scss",
})
export class SimulationComponent implements OnInit {
  dateRangeForm = this.fb.group({
    startDate: [null],
    endDate: [null],
  });

  dateTimeForm = this.fb.group({
    selectedDate: [null],
    selectedTime: [''],
  });
  timeOptions: string[] = [];

  constructor(private store: Store<any>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeTimeOptions();
  }

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
    } else {
      console.log("Start Date is not provided or invalid.");
    }

    if (endDateString) {
      const endDate = new Date(endDateString);
      endDateEST = this.adjustDateToEST(endDate, false);
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
    const selectedDate = this.dateTimeForm.value.selectedDate;
    const selectedTime = this.dateTimeForm.value.selectedTime;

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const date = new Date(selectedDate);

    const [hours, minutes] = selectedTime.split(":").map(Number);
    date.setHours(hours, minutes, 0);

    const formattedDateTime = `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())} ${this.pad(hours)}:${this.pad(minutes-5)}:00`;

    console.log(formattedDateTime);

    const payload = {
      endDateTime: formattedDateTime,
    };
    this.store.dispatch(fromRoot.searchStockData({ payload }));
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

  initializeTimeOptions(): void {
    const startTime = new Date(0, 0, 0, 9, 35);
    const endTime = new Date(0, 0, 0, 16, 5);
    while (startTime < endTime) {
      this.timeOptions.push(startTime.toTimeString().substring(0, 5));
      startTime.setMinutes(startTime.getMinutes() + 5);
    }
  }

  pad(number: number) {
    return number < 10 ? '0' + number : number;
  }
}
