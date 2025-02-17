import { Component, Injectable, OnInit } from '@angular/core';
import { Day } from "../model/Day";
import { Calendar } from "../model/Calendar";
import { DayService } from "../service/DayService";
import { DateUtil } from "../../util/DateUtil";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class CalendarComponent implements OnInit {

  selectedYear: number = new Date().getFullYear();
  selectedMonth: string = DateUtil.months[new Date().getMonth()];
  selectedDate: Date = new Date(this.selectedYear, new Date().getMonth() + 1, 0);
  years: number[] = Array.from({length: 11}, (_, i) => this.selectedYear - 5 + i);
  calendar: Calendar = new Calendar();

  constructor(private dayService: DayService) {
  }

  ngOnInit() {
    this.generateCalendarForSelectedMonth();
  }

  private generateCalendarForSelectedMonth() {
    this.dayService.getDaysWithDataForMonth(this.selectedDate).subscribe(data => {
      this.calendar = this.generateCalendar(data);
    });
  }

  private generateCalendar(daysWithData: Day[]): Calendar {
    let emptyCalendar = this.generateEmptyCalendar();
    return this.fillCalendarWithData(emptyCalendar, daysWithData);
  }

  private generateEmptyCalendar(): Calendar {
    let calendar = new Calendar();
    for (let i = 1; i <= this.selectedDate.getDate(); i++) {
      let day: Day = {
        id: 0,
        number: i,
        startDate: new Date(this.selectedYear, DateUtil.months.findIndex(m => m === this.selectedMonth), i + 1),
        isCrossedOff: false,
        appointments: [],
        goals: []
      };
      calendar.days.push(day);
    }

    return calendar;
  }

  private fillCalendarWithData(calendar: Calendar, daysWithData: Day[]) {
    for (let i = 0; i < daysWithData.length; i++) {
      let day = daysWithData[i];
      day.startDate = new Date(day.startDate);
      day.number = day.startDate.getDate();
      calendar.days[day.number - 1] = day;
    }
    return calendar;
  }

  public generateCalendarByMonthSelection(month: Event): void {
    const selectElement = month.target as HTMLSelectElement;
    this.selectedMonth = selectElement.value;
    this.selectedDate = new Date(this.selectedYear, DateUtil.months.findIndex(m => m === this.selectedMonth) + 1, 0);

    this.generateCalendarForSelectedMonth();
  }

  public generateCalendarByYearSelection(year: Event): void {
    const selectElement = year.target as HTMLSelectElement;
    this.selectedYear = Number(selectElement.value);
    this.selectedDate = new Date(this.selectedYear, DateUtil.months.findIndex(month => month === this.selectedMonth) + 1, 0);

    this.generateCalendarForSelectedMonth();
  }

  protected readonly DateUtil = DateUtil;
}
