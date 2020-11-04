import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeHelperService {

  constructor() { }

  toYYYYMMDD(date: any) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    return date.toISOString().split('T')[0]
  }

}
