import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uuidToId',
})
export class UuidToIdPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace('-', '')
      .replace('-', '')
      .replace('-', '')
      .replace('-', '')
      .toUpperCase()
      .substring(0, 10);
  }
}
