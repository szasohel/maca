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
    // this.http
    //   .get(
    //     // tslint:disable-next-line: max-line-length
    //     `http://api.aladhan.com/v1/timings?latitude=39.8008&longitude=-74.9150&method=2&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3&date_or_timestamp=${this.today()}`
    //   )
    //   .subscribe((data: any) => {
    //     this.data = data.data.timings;
    //   });
    this.data = {
      code: 200,
      status: 'OK',
      data: {
        timings: {
          Fajr: '03:57',
          Sunrise: '05:46',
          Dhuhr: '12:59',
          Asr: '16:55',
          Sunset: '20:12',
          Maghrib: '20:12',
          Isha: '22:02',
          Imsak: '03:47',
          Midnight: '00:59'
        },
        date: {
          readable: '24 Apr 2014',
          timestamp: '1398332113',
          gregorian: {
            date: '15-05-2018',
            format: 'DD-MM-YYYY',
            day: '15',
            weekday: {
              en: 'Tuesday'
            },
            month: {
              number: 5,
              en: 'May'
            },
            year: '2018',
            designation: {
              abbreviated: 'AD',
              expanded: 'Anno Domini'
            }
          },
          hijri: {
            date: '01-09-1439',
            format: 'DD-MM-YYYY',
            day: '01',
            weekday: {
              en: 'Al Thalaata',
              ar: 'الثلاثاء'
            },
            month: {
              number: 9,
              en: 'Ramaḍān',
              ar: 'رَمَضان'
            },
            year: '1439',
            designation: {
              abbreviated: 'AH',
              expanded: 'Anno Hegirae'
            },
            holidays: ['1st Day of Ramadan']
          }
        },
        meta: {
          latitude: 51.508515,
          longitude: -0.1254872,
          timezone: 'Europe/London',
          method: {
            id: 2,
            name: 'Islamic Society of North America (ISNA)',
            params: {
              Fajr: 15,
              Isha: 15
            }
          },
          latitudeAdjustmentMethod: 'ANGLE_BASED',
          midnightMode: 'STANDARD',
          school: 'STANDARD',
          offset: {
            Imsak: 0,
            Fajr: 0,
            Sunrise: 0,
            Dhuhr: 0,
            Asr: 0,
            Maghrib: 0,
            Sunset: 0,
            Isha: 0,
            Midnight: 0
          }
        }
      }
    };
    this.data = this.data.data.timings;
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
