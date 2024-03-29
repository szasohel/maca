import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {
  transform(time: any, ...args: unknown[]): unknown {

    time = time.substring(0, 5);
    let hour = time.split(':')[0];
    let min = time.split(':')[1];
    const part = hour > 12 ? 'PM' : 'AM';
    min = (min + '').length === 1 ? `0${min}` : min;
    hour = hour > 12 ? (hour - 12).toString() : hour;
    hour = (hour + '').length === 1 ? `0${hour}` : hour;

    return `${hour}:${min} ${part}`;
  }
}
