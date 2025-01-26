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
          console.log('Update successful:', response);
        }
      );
    } else {
      this.dayService.deleteDay(day).subscribe();
    }
  }
}
