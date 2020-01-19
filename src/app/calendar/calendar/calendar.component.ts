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

  constructor() {
  }

  ngOnInit() {
    let date = new Date();

    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];

    let currentYear = date.getFullYear();
    this.selectedYear = currentYear;
    this.selectedMonth = this.months[date.getMonth()];

    for (let i = currentYear - 5; i < currentYear + 5; i++) {
      this.years.push(i);
    }
  }

}
