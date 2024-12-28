import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from "../model/Day";

@Injectable({
  providedIn: 'root'
})
export class DayService {
  constructor(private http: HttpClient) {
  }

  getDaysWithDataForMonth(date: Date): Observable<Day[]> {
    const formattedDate = date.toISOString().split('T')[0];
    let params = new HttpParams().set('date', formattedDate);

    return this.http.get<Day[]>('http://localhost:8080/days', {params: params});
  }
}
