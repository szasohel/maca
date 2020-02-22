import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get(
        // tslint:disable-next-line: max-line-length
        `http://api.aladhan.com/v1/timings?latitude=39.8008&longitude=-74.9150&method=2&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3&date_or_timestamp=${this.today()}`
      )
      .subscribe((data: any) => {
        this.data = data.data.timings;
      });
  }

  today() {
    const today = new Date();
    const date =
      today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    const m = today.getMonth() + 1;
    const month = m < 10 ? `0${m}` : `${m}`;
    return `${date}/${month}/${today.getFullYear()}`;
  }
}
