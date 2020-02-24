import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data = {
    code: 200,
    status: 'OK',
    data: {
      timings: {
        Fajr: '05:28',
        Sunrise: '06:42',
        Dhuhr: '12:13',
        Asr: '15:16',
        Sunset: '17:45',
        Maghrib: '17:45',
        Isha: '18:59',
        Imsak: '05:18',
        Midnight: '00:13'
      },
      date: {
        readable: '23 Feb 2020',
        timestamp: '1582501552',
        hijri: {
          date: '28-06-1441',
          format: 'DD-MM-YYYY',
          day: '28',
          weekday: { en: 'Al Ahad', ar: '\u0627\u0644\u0627\u062d\u062f' },
          month: {
            number: 6,
            en: 'Jum\u0101d\u00e1 al-\u0101khirah',
            ar:
              '\u062c\u064f\u0645\u0627\u062f\u0649 \u0627\u0644\u0622\u062e\u0631\u0629'
          },
          year: '1441',
          designation: { abbreviated: 'AH', expanded: 'Anno Hegirae' },
          holidays: []
        },
        gregorian: {
          date: '23-02-2020',
          format: 'DD-MM-YYYY',
          day: '23',
          weekday: { en: 'Sunday' },
          month: { number: 2, en: 'February' },
          year: '2020',
          designation: { abbreviated: 'AD', expanded: 'Anno Domini' }
        }
      },
      meta: {
        latitude: 39.8008,
        longitude: -74.915,
        timezone: 'America/New_York',
        method: {
          id: 2,
          name: 'Islamic Society of North America (ISNA)',
          params: { Fajr: 15, Isha: 15 }
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
        `https://api.aladhan.com/v1/timings?latitude=39.8008&longitude=-74.9150&method=6&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3&date_or_timestamp=${this.today()}`
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
