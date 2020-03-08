import { Component, OnInit, ViewChild } from '@angular/core';
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
        this.prayerTimeToday = this.getEqamat()[0];
        this.prayerTimeToday['Maghrib'] =
          this.data.data.timings.Maghrib.substring(0, 3) +
          (+this.data.data.timings.Maghrib.substr(3) + 5);
        this.thtoday(data);
      });
  }

  getEqamat() {
    return this.eqamatTime.filter((data, i) => {
      const today = new Date(this.data.data.date.readable).getTime();
      const prev = new Date(data.date).getTime();
      const next =
        i + 1 < this.eqamatTime.length
          ? new Date(this.eqamatTime[i + 1].date).getTime()
          : 0;
      console.log(prev <= today, next);

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
      this.date.getDate() < 10
        ? `0${this.date.getDate()}`
        : `${this.date.getDate()}`;
    const m = this.date.getMonth() + 1;
    const month = m < 10 ? `0${m}` : `${m}`;
    return `${date}/${month}/${this.date.getFullYear()}`;
  }

  thtoday(data) {
    const formatedDate =
      this.data.data.date.readable.slice(0, 6) +
      ', ' +
      this.data.data.date.readable.slice(7);
    const timeNow = new Date()
      .toTimeString()
      .slice(0, 5)
      .replace(':', '');
    const fazr = this.data.data.timings.Fajr.replace(':', '');
    const dhuhr = this.data.data.timings.Dhuhr.replace(':', '');
    const asr = this.data.data.timings.Asr.replace(':', '');
    const maghrib = this.data.data.timings.Maghrib.replace(':', '');
    const isha = this.data.data.timings.Isha.replace(':', '');
    let countdown = '';
    if (timeNow < fazr) {
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
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      console.log(timeNow);

      // If the count down is over, write some text
      if (distance <= 0) {
        this.playAudio();
        clearInterval(x);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.itsPrayerTime = `It's time for` + this.nextPrayer;
      }
    }, 1000);
  }
}
