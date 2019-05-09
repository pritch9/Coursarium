import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'alphaNumeric'
})
export class AlphaNumericPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let retVal = '';

    for (let i = 0; i < value.length; ++i) {
      const char = value.charAt(i);
      const code = char.toLowerCase().charCodeAt(0);
      if ((code >= 97 && code <= 122) || (code >= 48 && code <= 57)) { // if lowerCase(char) is [a, z] or [0, 9]
        retVal += char;
      }
    }

    return retVal;
  }

}
