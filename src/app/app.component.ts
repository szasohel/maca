import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  date = new Date();
  mobile = false;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    if (window.screen.availWidth < 600) {
      this.mobile = true;
    }
    console.log(window.screen.availHeight, window.screen.availWidth);
    this.http
      .get(
        // tslint:disable-next-line: max-line-length
        `http://api.aladhan.com/v1/timings?latitude=39.8008&longitude=-74.9150&method=2&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3&date_or_timestamp=${this.today()}`
      )
      .subscribe((data: any) => {
        this.data = data;
      });
  }

  today() {
    const date =
      this.date.getDate() < 10
        ? `0${this.date.getDate()}`
        : `${this.date.getDate()}`;
    const m = this.date.getMonth() + 1;
    const month = m < 10 ? `0${m}` : `${m}`;
    return `${date}/${month}/${this.date.getFullYear()}`;
  }
}
