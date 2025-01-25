import { Component, Input } from '@angular/core';
import { Calendar } from "../../model/Calendar";
import { Day } from "../../model/Day";
import { DateUtil } from "../../../util/DateUtil";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  @Input() calendar: Calendar;
  @Input() selectedYear: number
  @Input() selectedMonth: string

  getDayColor(day: Day): string {
    if (day.goals.length > 0) {
      return "goldenrod";
    }

    if (day.isCrossedOff) {
      return "darkred";
    }

    return "steelblue";
  }

  getDayName(dayNumber: number) {
    return DateUtil.getDayName(new Date(this.selectedYear, DateUtil.months.findIndex(month => month === this.selectedMonth), dayNumber));
  }
}
