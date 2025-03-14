import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return '- ' + value[0].toUpperCase() + value.slice(1).toLocaleLowerCase() + ' -';
  }

}
