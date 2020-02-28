import { Component, OnInit, ViewChild } from '@angular/core';
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
        readable: '27 Feb 2020',
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
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  nextPrayer = '';
  itsPrayerTime: string;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    if (window.screen.availWidth < 600) {
      this.mobile = true;
    }
    console.log(window.screen.availHeight, window.screen.availWidth);
    this.http
      .get(
        // tslint:disable-next-line: max-line-length
        // `https://api.aladhan.com/v1/timings?latitude=39.8008&longitude=-74.9150&method=6&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3&date_or_timestamp=${this.today()}`
        ''
      )
      .subscribe((data: any) => {
        this.data = data;
        this.thtoday(data);

      });
    this.thtoday(this.data);
  }

  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/ting.mp3';
    audio.load();
    audio.play();
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

  thtoday(data) {
    const formatedDate = this.data.data.date.readable.slice(0, 6) + ', ' + this.data.data.date.readable.slice(7);
    const timeNow = new Date().toTimeString().slice(0, 5).replace(':', '');
    const fazr = this.data.data.timings.Fajr.replace(':', '');
    const dhuhr = this.data.data.timings.Dhuhr.replace(':', '');
    const asr = this.data.data.timings.Asr.replace(':', '');
    const maghrib = this.data.data.timings.Maghrib.replace(':', '');
    const isha = this.data.data.timings.Isha.replace(':', '');
    let countdown = '';
    if (timeNow < fazr && timeNow > isha) {
      countdown = this.data.data.timings.Fajr + ':00';
      this.nextPrayer = 'Fajr';
    } else if (timeNow > fazr && timeNow < dhuhr) {
      countdown = this.data.data.timings.Dhuhr + ':00';
      this.nextPrayer = 'Dhuhr';
    } else if (timeNow > dhuhr && timeNow < asr) {
      countdown = this.data.data.timings.Asr + ':00';
      this.nextPrayer = 'Asr';
    } else if (timeNow > asr && timeNow < maghrib) {
      countdown = this.data.data.timings.Maghrib + ':00';
      this.nextPrayer = 'Maghrib';
    } else if (timeNow > maghrib && timeNow < isha) {
      countdown = this.data.data.timings.Isha + ':00';
      this.nextPrayer = 'Isha';
    }

    const countDownDate = new Date(`${formatedDate} ${countdown}`).getTime();
    console.log(`${formatedDate} ${countdown}`);

    // Update the count down every 1 second
    const x = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;
      console.log(distance);

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      console.log(timeNow);

      // If the count down is over, write some text
      if (distance === 0) {
        this.playAudio();
        this.itsPrayerTime = 'this is time for ' + this.nextPrayer;
      }
    }, 1000);
  }
}
