import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor() { }
  public uniqueID() {
    const thisMS: number = Date.now();
    const shake = Math.random();
    let unique: string = Math.pow(thisMS, shake).toString();
    unique = unique.toString().replace('.', thisMS.toString());
    return unique;
  }
  public toOrdinal(v) {
    const ln = window.navigator.language;
    if (ln === 'ca') {
      return ['è', 'er', 'on', 'er', 'rt'][Math.abs(~[1, 2, 3, 4].indexOf(+(+v).toFixed().substr(-1)))]; // catala
    } else {
      return ['th', 'st', 'nd', 'rd'][Math.abs(~[1, 2, 3].indexOf(+(+v).toFixed().substr(-1)))]; // english
    }

  }
}
