import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from "../model/Day";

@Injectable({
  providedIn: 'root'
})
export class DayService {
  constructor(private http: HttpClient) {
  }

  private daysUrl = 'http://localhost:8080/days';

  getDaysWithDataForMonth(date: Date): Observable<Day[]> {
    const formattedDate = date.toISOString().split('T')[0];
    let params = new HttpParams().set('date', formattedDate);

    return this.http.get<Day[]>(this.daysUrl, {params: params});
  }

  saveDay(day: Day): Observable<Day> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Day>(this.daysUrl, day, {headers});
  }
}
