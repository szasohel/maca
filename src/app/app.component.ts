import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import * as eqamatTime from './eqamatTime';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => wobble', animate(1000, keyframes(kf.wobble))),
      transition('* => swing', animate(1000, keyframes(kf.swing))),
      transition('* => jello', animate(1000, keyframes(kf.jello))),
      transition('* => zoomOutRight', animate(1000, keyframes(kf.zoomOutRight))),
      transition('* => slideOutLeft', animate(1000, keyframes(kf.slideOutLeft))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
      transition('* => flipOutY', animate(1000, keyframes(kf.flipOutY))),
    ])
  ]
})
export class AppComponent implements OnInit {
  monthToday: string;
  monthTom: string;
  data$: any;
  maghrib: any;
  count = 0;
  showEdit: boolean;

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }
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
  eqamatTime = eqamatTime.times;
  apiData: any;
  dateSet = this.today();

  type;
  time;

  animationState: string;
  ngOnInit() {
    if (window.screen.availWidth < 600) {
      this.mobile = true;
    }
    this.data$ = this.db.list('data').valueChanges();

    this.data$.subscribe(arg => {
      console.log(arg[0]);

      this.prayerTimeToday = arg[0];
      this.getData();

    });


  }

  getData(mon?) {
    const month = mon ? mon : this.dateToday.getMonth() + 1;
    this.http
      .get(
        // tslint:disable-next-line: max-line-length
        `https://api.aladhan.com/v1/calendar?latitude=39.8008&longitude=-74.9150&method=6&month=${month}&year=2020&timezonestring=America/New_York&latitudeAdjustmentMethod=3`
      )
      .subscribe((data: any) => {
        this.apiData = data;
        this.setData(this.dateSet, data.data);
      });
  }

  setData(day: string, data: any[]) {

    this.data = data.filter((dayData) => {

      return dayData.date.gregorian.date === day;
    })[0];



    // this.prayerTimeToday = this.getEqamat()[0];

    this.setMagribTime();
    this.thtoday(data);

  }

  startEdit() {
    console.log(this.count);

    if (this.count <= 3) {
      this.count++;
    }
    if (this.count === 3) {
      this.showEdit = !this.showEdit;
      this.count = 0;

    }
  }

  setMagribTime() {

    let min = +this.data.timings.Maghrib.substr(3, 2) + 5;
    const hrs = min > 59 ? +this.data.timings.Maghrib.substring(0, 2) + 1 : this.data.timings.Maghrib.substring(0, 2);
    min = min > 59 ? 0 : min;
    console.log(min, hrs);

    this.maghrib = hrs + ':' + min;
  }

  onSave(type, time) {
    console.log(type, time.length);
    const body = {};
    time = time.length === 7 ? '0' + time : time;
    body[type] = time;
    this.db.list('data').update('prayer', body);
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
    this.monthToday = month;
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
    this.monthTom = month;
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

  startAnimation(state) {
    if (!this.animationState && this.dateSet === this.today() && state === 'slideOutLeft') {
      setTimeout(() => {
        if (this.monthToday !== this.monthTom) {
          this.getData(this.monthTom);
        }
        this.dateSet = (this.dateSet === this.tomorrow()) ? this.today() : this.tomorrow();
        this.setData(this.dateSet, this.apiData.data);
      }, 700);
      this.animationState = state;
    } else if (!this.animationState && this.dateSet === this.tomorrow() && state === 'zoomOutRight') {

      setTimeout(() => {
        if (this.monthToday !== this.monthTom) {
          this.getData(this.monthToday);
        }
        this.dateSet = (this.dateSet === this.tomorrow()) ? this.today() : this.tomorrow();
        this.setData(this.dateSet, this.apiData.data);
      }, 700);
      this.animationState = state;
    }
  }

  resetAnimationState() {
    this.animationState = '';
  }
}
