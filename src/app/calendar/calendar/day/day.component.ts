import { Component, Input } from '@angular/core';
import { Calendar } from "../../model/Calendar";
import { Day } from "../../model/Day";
import { DateUtil } from "../../../util/DateUtil";
import { DayService } from "../../service/DayService";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent {

  constructor(private dayService: DayService) {
  }

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

  crossDay(day: Day) {
    day.isCrossedOff = !day.isCrossedOff;

    if (day.isCrossedOff) {
      this.dayService.saveDay(day).subscribe(
        (response) => {
          this.calendar.days[response.number - 1] = response;
        }
      );
    } else {
      this.calendar.days[day.number - 1] = {
        id: 0,
        number: day.number,
        startDate: new Date(this.selectedYear, DateUtil.months.findIndex(m => m === this.selectedMonth), day.number + 1),
        isCrossedOff: false,
        appointments: [],
        goals: []
      };
      this.dayService.deleteDay(day).subscribe();
    }
  }
}
