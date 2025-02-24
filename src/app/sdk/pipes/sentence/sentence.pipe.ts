import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentence',
})
export class SentencePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const fl = value.split('')[0].toUpperCase();
    return fl + value.toLowerCase().slice(1);
  }
}
