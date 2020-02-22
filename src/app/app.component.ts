import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http
      .get(`http://api.aladhan.com/v1/calendar?latitude=39.8008&longitude=-74.9150&method=1&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3`)
      .subscribe((data: any) => {
        this.data = data.data[0].timings;
      });
  }

}
