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
  Message;
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
        `https://api.aladhan.com/v1/timings?latitude=39.8008&longitude=-74.9150&method=6&month=2&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3&date_or_timestamp=${this.today()}`

      )
      .subscribe((data: any) => {
        this.data = data;
        this.thtoday(data);

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
    const formatedDate = this.data.data.date.readable.slice(0, 6) + ', ' + this.data.data.date.readable.slice(7);
    const timeNow = new Date().toTimeString().slice(0, 5).replace(':', '');
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
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
        this.message = 'It's time for' + this.nextPrayer;
      }
    }, 1000);
  }
}
