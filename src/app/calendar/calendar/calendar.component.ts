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
    this.selectedDate = new Date(this.selectedYear, this.selectedDate.getMonth(), 0);

    for (let i = currentYear - 5; i < currentYear + 5; i++) {
      this.years.push(i);
    }
    this.generateCalendar();
  }

  private generateCalendar() {
    this.calendar = [];

    for (let i = 1; i <= this.selectedDate.getDate(); i++) {
      this.calendar.push(i);
    }
  }

  public generateCalendarByMonthSelection(month: Event): void {
    const selectElement = month.target as HTMLSelectElement;
    this.selectedMonth = selectElement.value;
    this.selectedDate = new Date(this.selectedYear, this.months.findIndex(m => m === this.selectedMonth) + 1, 0);

    console.log(this.selectedMonth);
    this.generateCalendar();
  }

  public generateCalendarByYearSelection(year: Event): void {
    const selectElement = year.target as HTMLSelectElement;
    this.selectedYear = Number(selectElement.value);
    this.selectedDate = new Date(this.selectedYear, this.months.findIndex(month => month === this.selectedMonth) + 1, 0);

    console.log(this.selectedYear);
    console.log(this.selectedDate);
    this.generateCalendar();
  }

}
