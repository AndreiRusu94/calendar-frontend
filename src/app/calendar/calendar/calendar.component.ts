import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  months: string[];
  years: number[] = [];
  selectedYear: number;
  selectedMonth: string;
  selectedDate: Date;
  calendar: number[] = [];

  constructor() {
  }

  ngOnInit() {
    this.selectedDate = new Date();

    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];

    let currentYear = this.selectedDate.getFullYear();
    this.selectedYear = currentYear;
    this.selectedMonth = this.months[this.selectedDate.getMonth()];

    for (let i = currentYear - 5; i < currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  public generateCalendarByMonthSelection(month: string): void {
    this.calendar = [];
    this.selectedMonth = month;
    this.selectedDate = new Date(this.selectedYear, this.months.findIndex(m => m === month));

    for (let i = 0; i < this.selectedDate.getDay(); i++) {
      this.calendar.push(i);
    }
  }

  public generateCalendarByYearSelection(year: number): void {
    this.selectedYear = year;
    this.selectedDate = new Date(year, this.months.findIndex(month => month === this.selectedMonth));

    for (let i = 0; i < this.selectedDate.getDay(); i++) {
      this.calendar.push(i);
    }
  }

}
