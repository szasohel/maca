import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  dateToday = new Date();
  dateTomorrow: Date;
  mobile = false;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  nextPrayer = '';
  itsPrayerTime: string;
  prayerTimeToday;
  eqamatTime = [
    {
      date: '8 Mar 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Mar 2020',
      Fajr: '06:15',
      Dhuhr: '13:30',
      Asr: '17:00',
      Isha: '20:45'
    },
    {
      date: '1 Apr 2020',
      Fajr: '05:45',
      Dhuhr: '13:30',
      Asr: '17:00',
      Isha: '21:00'
    },
    {
      date: '16 Apr 2020',
      Fajr: '05:30',
      Dhuhr: '13:30',
      Asr: '17:00',
      Isha: '20:15'
    },
    {
      date: '1 May 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 May 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Jun 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Jun 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Jul 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Jul 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Aug 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Aug 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Sep 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Sep 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Oct 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Oct 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Nov 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Nov 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '1 Dec 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    },
    {
      date: '16 Dec 2020',
      Fajr: '06:30',
      Dhuhr: '13:30',
      Asr: '16:45',
      Isha: '20:30'
    }
  ];
  apiData: any;
  dateSet: string | (() => string);

  constructor(private http: HttpClient) { }
  ngOnInit() {
    if (window.screen.availWidth < 600) {
      this.mobile = true;
    }
    this.getData();

  }

  onClick() {
    this.dateSet = (this.dateSet === this.tomorrow()) ? this.today() : this.tomorrow();
    this.setData(this.dateSet, this.apiData.data);
  }

  getData() {
    this.http
      .get(
        // tslint:disable-next-line: max-line-length
        `https://api.aladhan.com/v1/calendar?latitude=39.8008&longitude=-74.9150&method=6&month=${this.dateToday.getMonth() + 1}&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3`
      )
      .subscribe((data: any) => {
        this.apiData = data;
        this.setData(this.today(), data.data);

        this.prayerTimeToday = this.getEqamat()[0];
        this.prayerTimeToday.Maghrib =
          this.data.timings.Maghrib.substring(0, 3) +
          (+this.data.timings.Maghrib.substr(3, 2) + 5);
        console.log(this.data.timings.Maghrib.substr(3, 2) + 5);

        this.thtoday(data);
      });
  }

  setData(day: string, data: any[]) {

    this.data = data.filter((dayData) => {
      console.log(dayData.date.gregorian.date, day);

      return dayData.date.gregorian.date === day;
    })[0];

    console.log(this.data);

  }

  getEqamat() {
    return this.eqamatTime.filter((data, i) => {
      const today = new Date(this.data.date.readable).getTime();
      const prev = new Date(data.date).getTime();
      const next =
        i + 1 < this.eqamatTime.length
          ? new Date(this.eqamatTime[i + 1].date).getTime()
          : 0;

      return prev <= today && today < next;
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/ting.mp3';
    audio.load();
    audio.play();
  }

  today() {
    const date =
      this.dateToday.getDate() < 10
        ? `0${this.dateToday.getDate()}`
        : `${this.dateToday.getDate()}`;
    const m = this.dateToday.getMonth() + 1;
    const month = m < 10 ? `0${m}` : `${m}`;
    return `${date}-${month}-${this.dateToday.getFullYear()}`;
  }

  tomorrow() {
    this.dateTomorrow = new Date(this.dateToday);
    this.dateTomorrow.setDate(this.dateTomorrow.getDate() + 1);
    const date =
      this.dateTomorrow.getDate() < 10
        ? `0${this.dateTomorrow.getDate()}`
        : `${this.dateTomorrow.getDate()}`;
    const m = this.dateTomorrow.getMonth() + 1;
    const month = m < 10 ? `0${m}` : `${m}`;
    return `${date}-${month}-${this.dateTomorrow.getFullYear()}`;
  }

  thtoday(data) {
    const formatedDate =
      this.data.date.readable.slice(0, 6) +
      ', ' +
      this.data.date.readable.slice(7);
    const timeNow = new Date()
      .toTimeString()
      .slice(0, 5)
      .replace(':', '');
    const fazr = this.data.timings.Fajr.replace(':', '');
    const dhuhr = this.data.timings.Dhuhr.replace(':', '');
    const asr = this.data.timings.Asr.replace(':', '');
    const maghrib = this.data.timings.Maghrib.replace(':', '');
    const isha = this.data.timings.Isha.replace(':', '');
    let countdown = '';
    if (timeNow < fazr) {
      countdown = this.data.timings.Fajr + ':00';
      this.nextPrayer = 'Fajr';
      localStorage.setItem('nextPrayer', this.nextPrayer);
    } else if (timeNow > fazr && timeNow < dhuhr) {
      countdown = this.data.timings.Dhuhr + ':00';
      this.nextPrayer = 'Dhuhr';
      localStorage.setItem('nextPrayer', this.nextPrayer);
    } else if (timeNow > dhuhr && timeNow < asr) {
      countdown = this.data.timings.Asr + ':00';
      this.nextPrayer = 'Asr';
      localStorage.setItem('nextPrayer', this.nextPrayer);
    } else if (timeNow > asr && timeNow < maghrib) {
      countdown = this.data.timings.Maghrib + ':00';
      this.nextPrayer = 'Maghrib';
      localStorage.setItem('nextPrayer', this.nextPrayer);
    } else if (timeNow > maghrib && timeNow < isha) {
      countdown = this.data.timings.Isha + ':00';
      this.nextPrayer = 'Isha';
      localStorage.setItem('nextPrayer', this.nextPrayer);
    } else if (timeNow > isha) {
      this.nextPrayer = 'Isha';
      localStorage.setItem('nextPrayer', this.nextPrayer);
    }

    this.nextPrayer = localStorage.getItem('nextPrayer');

    const countDownDate = new Date(`${formatedDate} ${countdown}`).getTime();

    // Update the count down every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance <= 0) {
        if (timeNow <= isha) {
          this.playAudio();
        }
        clearInterval(x);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.itsPrayerTime = `It's time for ` + this.nextPrayer;
      }
    }, 1000);
  }
}
