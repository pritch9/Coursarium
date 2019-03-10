import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabet'
})
export class AlphabetPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let retVal = '';

    for (let i = 0; i < value.length; ++i) {
      const char = value.charAt(i);
      const code = char.toLowerCase().charCodeAt(0);
      if (code >= 97 && code <= 122) { // if lowerCase(char) is [a, z]
        retVal += char;
      }
    }

    return retVal;
  }

}
