import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
   transform(fullName: string): string {

    if (!fullName) return '';

    return fullName
      .trim()
      .split(' ')
      .map((word,index) => index < 2 ? word[0] : '')
      .join('')
      .toUpperCase();

  }

}
